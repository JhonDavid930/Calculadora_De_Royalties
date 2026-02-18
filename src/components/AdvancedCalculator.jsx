import React, { useState, useMemo } from 'react';
import {
    DollarSign,
    BarChart3,
    Globe,
    Info,
    TrendingUp,
    Plus,
    Trash2,
    RefreshCcw,
    Layers
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from 'recharts';
import Card from './ui/Card';
import StatBox from './ui/StatBox';
import { COUNTRY_DB, COLORS } from '../constants/countries';
import CountrySelectorModal from './ui/CountrySelectorModal';
import ConfirmModal from './ui/ConfirmModal';

import { useRoyaltyCalculations } from '../hooks/useRoyaltyCalculations';

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
    const hasData = useMemo(() => {
        return countryData.some(c => c.country || c.streams > 0);
    }, [countryData]);

    const resetData = () => {
        setIsConfirmResetOpen(true);
    }

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    const formatNumber = (val) => new Intl.NumberFormat('en-US').format(val);

    // Logic to split the view - REMOVED for unified scrolling list
    // const primaryCountries = countryData.slice(0, 5);
    // const secondaryCountries = countryData.slice(5);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatBox
                    label="Ingresos Estimados"
                    value={formatCurrency(totalRevenue)}
                    subtext="Basado en los datos ingresados"
                    icon={DollarSign}
                    highlight
                />
                <StatBox
                    label="Total Streams"
                    value={formatNumber(totalStreams)}
                    subtext="Volumen manual total"
                    icon={BarChart3}
                />
                <StatBox
                    label="RPM Efectivo"
                    value={`$${effectiveRPM.toFixed(2)}`}
                    subtext="Ingreso promedio por 1,000 streams"
                    icon={TrendingUp}
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
                                <button onClick={resetData} className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1 bg-dark-border px-3 py-2 rounded hover:bg-dark-hover transition-colors">
                                    <RefreshCcw className="w-3 h-3" /> Limpiar
                                </button>
                                <button onClick={() => setIsModalOpen(true)} className="text-xs text-black font-bold flex items-center gap-1 bg-spotify-green px-3 py-2 rounded hover:bg-spotify-light transition-colors shadow-lg shadow-green-900/20">
                                    <Layers className="w-3 h-3" /> Selector Masivo
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Header de la Tabla (Solo visible en Desktop) */}
                            <div className="hidden md:grid md:grid-cols-12 md:gap-4 border-b border-dark-border pb-2 text-text-secondary text-sm font-medium px-4">
                                <div className="md:col-span-4 pl-2">País</div>
                                <div className="md:col-span-3 text-right">Streams</div>
                                <div className="md:col-span-3 text-right">Rate ($)</div>
                                <div className="md:col-span-2 text-right">Total</div>
                            </div>

                            {/* Filas de Datos (Unified List) */}
                            <div className="space-y-4 md:space-y-0 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                {countryData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group bg-dark-bg md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none border border-dark-border md:border-0 md:border-b md:border-dark-border md:hover:bg-dark-hover transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative"
                                    >

                                        {/* Selector de País */}
                                        <div className="col-span-12 md:col-span-4 relative">
                                            <label className="block md:hidden text-xs text-text-secondary mb-1">País</label>
                                            <div className="relative">
                                                <select
                                                    className={`w-full bg-[#222] border border-transparent rounded p-3 md:p-2 outline-none focus:border-spotify-green cursor-pointer appearance-none ${!item.country ? 'text-text-muted' : 'text-text-primary font-medium'} text-base`}
                                                    value={item.country}
                                                    onChange={(e) => selectCountry(item.id, e.target.value)}
                                                >
                                                    <option value="" disabled>Selecciona un país...</option>
                                                    {COUNTRY_DB.map(c => (
                                                        <option key={c.code} value={c.name}>
                                                            {c.name} (Tier {c.tier})
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
                                                className="bg-transparent border-b border-dark-hover focus:border-spotify-green text-right w-full p-2 md:p-1.5 outline-none text-text-primary font-mono placeholder-dark-hover text-base transition-colors"
                                                value={item.streams || ''}
                                                placeholder="0"
                                                disabled={!item.country}
                                                onChange={(e) => updateCountryStream(item.id, e.target.value)}
                                            />
                                        </div>

                                        {/* Input Rate */}
                                        <div className="col-span-6 md:col-span-3">
                                            <label className="block md:hidden text-xs text-text-secondary mb-1">Rate ($)</label>
                                            <input
                                                type="number"
                                                step="0.0001"
                                                className="bg-transparent text-right w-full p-2 md:p-1.5 outline-none text-text-secondary focus:text-text-primary font-mono text-xs md:text-xs"
                                                value={item.rate || ''}
                                                disabled={!item.country}
                                                onChange={(e) => updateCountryRate(item.id, e.target.value)}
                                            />
                                        </div>

                                        {/* Total Calculado */}
                                        <div className="col-span-12 md:col-span-2 flex justify-between md:block items-center border-t border-dark-border md:border-0 pt-2 md:pt-0 mt-2 md:mt-0">
                                            <span className="block md:hidden text-xs text-text-secondary">Total Estimado</span>
                                            <div className="text-right font-mono text-spotify-green font-bold bg-dark-surface md:bg-transparent px-2 rounded">
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botón Simple para agregar fila manualmente */}
                        <button onClick={addEmptyRow} className="w-full mt-4 py-3 md:py-2 border border-dashed border-dark-hover rounded text-text-muted hover:text-spotify-green hover:border-spotify-green text-sm transition-all flex items-center justify-center gap-2">
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
                    <Card>
                        <h3 className="text-md font-bold mb-4 text-text-secondary">Distribución de Ingresos</h3>
                        <div className="h-64 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.name === 'Sin datos' ? '#282828' : COLORS[index % COLORS.length]}
                                                stroke="none"
                                            />
                                        ))}
                                    </Pie>
                                    {totalRevenue > 0 && (
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#181818', borderColor: '#282828', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                            formatter={(value) => formatCurrency(value)}
                                        />
                                    )}
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    {totalRevenue > 0 ? (
                                        <>
                                            <span className="text-xs text-text-secondary">Total</span>
                                            <p className="font-bold text-text-primary text-lg">{formatCurrency(totalRevenue)}</p>
                                        </>
                                    ) : (
                                        <span className="text-xs text-text-muted">Ingresa streams</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 mt-2">
                            {totalRevenue > 0 ? chartData.slice(0, 5).map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                        <span className="text-text-secondary">{item.name}</span>
                                    </div>
                                    <span className="text-text-primary font-mono">{formatCurrency(item.value)}</span>
                                </div>
                            )) : (
                                <p className="text-center text-xs text-text-muted">La gráfica se actualizará al ingresar datos.</p>
                            )}
                        </div>
                    </Card>
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

