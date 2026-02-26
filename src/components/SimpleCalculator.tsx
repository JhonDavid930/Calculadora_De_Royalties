import { useState } from 'react';
import Users from 'lucide-react/dist/esm/icons/users';
import Card from './ui/Card';
import AnimatedCounter from './ui/AnimatedCounter';

const SimpleCalculator = () => {
    const [simpleStreams, setSimpleStreams] = useState('100000');
    const [simpleRate, setSimpleRate] = useState(0.003);

    const handleStreamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Eliminar ceros iniciales: "06767" -> "6767", "" se queda vacío
        const cleaned = raw === '' ? '' : String(Number(raw));
        setSimpleStreams(cleaned);
    };

    const streamsNumber = Number(simpleStreams) || 0;

    const formatCurrency = (val: number): string => {
        if (Math.abs(val) >= 1_000_000_000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(val);
        if (Math.abs(val) >= 1_000_000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(val);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-text-primary">Calculadora Rápida</h2>
                <p className="text-text-secondary">Estimación basada en promedios globales.</p>
            </div>

            <Card className="p-8 border-spotify-green/20 bg-gradient-to-b from-dark-surface to-dark-bg">
                <div className="space-y-8">
                    <div id="tour-streams-input">
                        <label className="block text-sm font-medium text-text-secondary mb-2">Total de Streams</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={simpleStreams}
                                onChange={handleStreamsChange}
                                className="w-full bg-dark-border border border-dark-hover rounded-md p-4 pr-14 text-2xl font-bold text-text-primary focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/50 transition-colors duration-200 font-mono"
                            />
                            <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                        </div>
                    </div>

                    <div id="tour-country-selector">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-text-secondary">Pago Promedio por Stream</label>
                            <span className="text-spotify-green font-mono font-bold">${simpleRate}</span>
                        </div>
                        <input
                            type="range"
                            min="0.001"
                            max="0.008"
                            step="0.0001"
                            value={simpleRate}
                            onChange={(e) => setSimpleRate(Number(e.target.value))}
                            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-spotify-green hover:bg-dark-hover transition-colors duration-200"
                        />
                        <div className="flex justify-between text-xs text-text-muted mt-2">
                            <span>$0.001 (Bajo)</span>
                            <span>$0.004 (Tier 1)</span>
                            <span>$0.008 (Muy Alto)</span>
                        </div>
                    </div>

                    <div id="tour-stat-cards" className="pt-6 border-t border-dark-border text-center overflow-hidden">
                        <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Ingreso Estimado</p>
                        <AnimatedCounter
                            value={streamsNumber * simpleRate}
                            formatter={formatCurrency}
                            className="text-3xl md:text-5xl font-bold text-text-primary"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SimpleCalculator;
