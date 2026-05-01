import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Info from 'lucide-react/dist/esm/icons/info';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import RefreshCcw from 'lucide-react/dist/esm/icons/refresh-ccw';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Card from './ui/Card';
import StatBox from './ui/StatBox';
import AnimatedCounter from './ui/AnimatedCounter';
import { COUNTRY_DB } from '../constants/countries';
import CountrySelectorModal from './ui/CountrySelectorModal';
import ConfirmModal from './ui/ConfirmModal';

import { useRoyaltyCalculations } from '../hooks/useRoyaltyCalculations';

const RevenueDistributionChart = lazy(() => import('./ui/RevenueDistributionChart'));

const RevenueDistributionFallback = () => (
    <Card>
        <h3 className="text-md font-bold mb-4 text-text-secondary">Distribución de Ingresos</h3>
        <div className="h-64 w-full rounded-lg border border-white/10 bg-white/[0.02] animate-pulse"></div>
        <p className="text-center text-xs text-text-muted mt-4">Cargando visualización de ingresos...</p>
    </Card>
);

const AdvancedCalculator = () => {
    const {
        countryData,
        totalStreams,
        totalRevenue,
        effectiveRPM,
        chartData,
        updateCountryStream,
        updateCountryRate,
        selectCountry,
        handleAddCountries,
        addEmptyRow,
        removeCountry,
        resetData: resetCalculations
    } = useRoyaltyCalculations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

    // Determinar si hay datos para limpiar
    const hasData = countryData.some(c => c.country || c.streams > 0);

    const resetData = (): void => {
        setIsConfirmResetOpen(true);
    }

    const formatCurrency = (val: number): string => {
        if (Math.abs(val) >= 1_000_000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(val);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };
    const formatNumber = (val: number): string => {
        if (Math.abs(val) >= 1_000_000_000) return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);
        return new Intl.NumberFormat('en-US').format(val);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatBox
                    label="Ingresos Estimados"
                    value={<AnimatedCounter value={totalRevenue} formatter={formatCurrency} className="text-2xl font-bold text-spotify-green truncate" />}
                    subtext="Basado en los datos ingresados"
                    icon={DollarSign}
                    highlight
                    index={0}
                />
                <StatBox
                    label="Total Streams"
                    value={<AnimatedCounter value={totalStreams} formatter={formatNumber} className="text-2xl font-bold text-text-primary truncate" />}
                    subtext="Volumen manual total"
                    icon={BarChart3}
                    index={1}
                />
                <StatBox
                    label="RPM Efectivo"
                    value={<AnimatedCounter value={effectiveRPM} formatter={(v) => `$${v.toFixed(2)}`} className="text-2xl font-bold text-text-primary truncate" />}
                    subtext="Ingreso promedio por 1,000 streams"
                    icon={TrendingUp}
                    index={2}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card className="h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                                <Globe className="w-5 h-5 text-spotify-green" />
                                Desglose por País
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={resetData} className="text-xs text-text-secondary flex items-center gap-1 bg-dark-border px-3 py-2 rounded transition-all duration-200 cursor-pointer hover:bg-dark-hover hover:text-text-primary hover:-translate-y-0.5">
                                    <RefreshCcw className="w-3 h-3" /> Limpiar
                                </button>
                                <button onClick={() => setIsModalOpen(true)} className="text-xs text-black font-bold flex items-center gap-1 bg-spotify-green px-3 py-2 rounded shadow-lg shadow-green-900/20 transition-all duration-200 cursor-pointer hover:bg-spotify-light hover:shadow-green-900/40 hover:-translate-y-0.5">
                                    <Layers className="w-3 h-3" /> Selector Masivo
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Header de la Tabla (Solo visible en Desktop) */}
                            <div className="hidden md:grid md:grid-cols-12 md:gap-4 border-b border-dark-border pb-2 text-text-secondary text-sm font-medium px-4">
                                <div className="md:col-span-4 pl-2">País</div>
                                <div className="md:col-span-3 text-right">Streams</div>
                                <div className="md:col-span-2 text-right">Rate ($)</div>
                                <div className="md:col-span-3 text-right">Total</div>
                            </div>

                            {/* Filas de Datos (Unified List) */}
                            <div className="space-y-4 md:space-y-0 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                <AnimatePresence initial={false}>
                                    {countryData.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            className="group bg-transparent p-4 md:p-0 rounded-lg md:rounded-none border border-white/5 md:border-0 md:border-b transition-colors duration-200 hover:bg-white/[0.03] grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative"
                                        >

                                            {/* Selector de País */}
                                            <div className="col-span-12 md:col-span-4 relative">
                                                <label className="block md:hidden text-xs text-text-secondary mb-1">País</label>
                                                <div className="relative">
                                                    <select
                                                        className={`w-full bg-transparent border border-transparent rounded p-3 md:p-2 outline-none cursor-pointer appearance-none ${!item.country ? 'text-text-muted' : 'text-text-primary font-medium'} text-base transition-colors hover:bg-white/5 focus:bg-white/10`}
                                                        value={item.country}
                                                        onChange={(e) => selectCountry(item.id, e.target.value)}
                                                    >
                                                        <option value="" disabled className="bg-[#121212] text-white">Selecciona un país...</option>
                                                        {COUNTRY_DB.map(c => (
                                                            <option key={c.code} value={c.name} className="bg-[#121212] text-white">
                                                                {c.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {item.tier && (
                                                        <span className={`absolute right-8 md:right-4 top-1/2 transform -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border ${item.tier === 1 ? 'border-green-500 text-green-500' :
                                                            item.tier === 2 ? 'border-blue-500 text-blue-500' :
                                                                item.tier === 3 ? 'border-yellow-500 text-yellow-500' :
                                                                    'border-orange-500 text-orange-500'
                                                            } pointer-events-none`}>
                                                            T{item.tier}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Input Streams */}
                                            <div className="col-span-6 md:col-span-3">
                                                <label className="block md:hidden text-xs text-text-secondary mb-1">Streams</label>
                                                <input
                                                    type="number"
                                                    className="bg-transparent border-b border-dark-hover focus:border-spotify-green text-right w-full p-2 md:p-1.5 outline-none text-text-primary font-mono placeholder-dark-hover text-base transition-all duration-200 focus:ring-opacity-50"
                                                    value={item.streams || ''}
                                                    placeholder="0"
                                                    disabled={!item.country}
                                                    onChange={(e) => updateCountryStream(item.id, e.target.value)}
                                                />
                                            </div>

                                            {/* Input Rate */}
                                            <div className="col-span-6 md:col-span-2">
                                                <label className="block md:hidden text-xs text-text-secondary mb-1">Rate ($)</label>
                                                <input
                                                    type="number"
                                                    step="0.0001"
                                                    className="bg-transparent border-b border-transparent focus:border-spotify-green text-right w-full p-2 md:p-1.5 outline-none text-text-secondary focus:text-text-primary font-mono text-xs md:text-xs transition-colors duration-200"
                                                    value={item.rate || ''}
                                                    disabled={!item.country}
                                                    onChange={(e) => updateCountryRate(item.id, e.target.value)}
                                                />
                                            </div>

                                            {/* Total Calculado */}
                                            <div className="col-span-12 md:col-span-3 flex justify-between md:block items-center border-t border-dark-border md:border-0 pt-2 md:pt-0 mt-2 md:mt-0">
                                                <span className="block md:hidden text-xs text-text-secondary">Total Estimado</span>
                                                <div className="text-right font-mono text-spotify-green font-bold bg-dark-surface md:bg-transparent px-2 rounded truncate">
                                                    {formatCurrency(item.streams * item.rate)}
                                                </div>
                                            </div>

                                            {/* Botón Eliminar (Flotante en Móvil) */}
                                            <button
                                                onClick={() => removeCountry(item.id)}
                                                className="absolute top-2 right-2 md:static md:col-span-0.5 p-2 text-text-muted hover:text-red-500 transition-colors md:opacity-0 md:group-hover:opacity-100 bg-dark-surface md:bg-transparent rounded-full md:rounded-none shadow-sm md:shadow-none"
                                                title="Eliminar fila"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Botón Simple para agregar fila manualmente */}
                        <button onClick={addEmptyRow} className="w-full mt-4 py-3 md:py-2 border border-dashed border-dark-hover rounded text-text-muted hover:text-spotify-green hover:border-spotify-green hover:bg-spotify-green/5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Agregar fila vacía
                        </button>

                        <div className="mt-4 pt-4 border-t border-dark-border text-xs text-text-secondary flex items-start gap-2">
                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <p>
                                Tip: Usa el "Selector Masivo" para agregar múltiples países rápidamente.
                                Las primeras 5 filas se muestran aquí, el resto aparecerá en el listado compacto abajo.
                            </p>
                        </div>
                    </Card>

                    {/* Secondary Countries List (Compact) - REMOVED */}
                </div>

                <div className="space-y-6">
                    <Suspense fallback={<RevenueDistributionFallback />}>
                        <RevenueDistributionChart
                            chartData={chartData}
                            totalRevenue={totalRevenue}
                            formatCurrency={formatCurrency}
                        />
                    </Suspense>
                </div>
            </div>

            {/* Modals */}
            <CountrySelectorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCountries={handleAddCountries}
                existingCountries={countryData}
            />

            <ConfirmModal
                isOpen={isConfirmResetOpen}
                onClose={() => setIsConfirmResetOpen(false)}
                onConfirm={resetCalculations}
                title={hasData ? "¿Limpiar tabla?" : "Tabla vacía"}
                message={hasData
                    ? "Esta acción eliminará todos los streams y países ingresados. No se puede deshacer."
                    : "No hay datos ingresados para limpiar. La tabla ya está en su estado inicial."}
                confirmText={hasData ? "Limpiar todo" : null}
                cancelText={hasData ? "Mantener datos" : "Entendido"}
            />
        </div>
    );
};

export default AdvancedCalculator;
