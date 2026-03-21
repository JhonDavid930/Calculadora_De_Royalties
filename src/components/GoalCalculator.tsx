import { useState } from 'react';
import { motion } from 'motion/react';
import Target from 'lucide-react/dist/esm/icons/target';
import Info from 'lucide-react/dist/esm/icons/info';
import AnimatedCounter from './ui/AnimatedCounter';

interface AudienceOption {
    label: string;
    val: number;
    desc: string;
}

const GoalCalculator = () => {
    const [goalAmount, setGoalAmount] = useState('1000');
    const [goalAvgRate, setGoalAvgRate] = useState(0.0025);

    const formatNumber = (val: number): string => {
        if (Math.abs(val) >= 1_000_000_000) return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);
        return new Intl.NumberFormat('en-US').format(val);
    };

    const audienceOptions: AudienceOption[] = [
        { label: 'Tier 1 (US/UK/EU)', val: 0.0040, desc: 'Mayoría audiencia anglosajona' },
        { label: 'Tier 3 (LatAm/Mix)', val: 0.0025, desc: 'Mix España, México, Chile' },
        { label: 'Tier 5 (Viral/Free)', val: 0.0012, desc: 'Alta proporción cuentas gratis' }
    ];

    const streamsNeeded = Math.ceil((Number(goalAmount) || 0) / goalAvgRate);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-text-primary">¿Cuánto quieres ganar?</h2>
                    <p className="text-text-secondary mb-8">
                        Calcula cuántos streams necesitas mensualmente para alcanzar tu objetivo financiero, basado en tu mezcla de audiencia.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Meta Mensual (USD)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted text-xl">$</span>
                                <input
                                    type="number"
                                    value={goalAmount}
                                    onChange={(e) => setGoalAmount(e.target.value)}
                                    className="w-full glass-input pl-10 pr-4 py-4 text-2xl font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Tu Perfil de Audiencia (RPM)</label>
                            <div className="grid grid-cols-1 gap-2">
                                {audienceOptions.map((option) => (
                                    <motion.button
                                        key={option.val}
                                        layout
                                        onClick={() => setGoalAvgRate(option.val)}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-3 rounded-md text-left border cursor-pointer transition-colors duration-200 ${goalAvgRate === option.val
                                            ? 'bg-spotify-green/10 border-spotify-green ring-1 ring-spotify-green/50'
                                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`font-bold ${goalAvgRate === option.val ? 'text-spotify-green' : 'text-text-primary'}`}>{option.label}</span>
                                            <span className="text-sm font-mono opacity-70 text-text-secondary">${option.val}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary mt-1">{option.desc}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
                    className="glass-panel hover:shadow-neon p-8 flex flex-col items-center justify-center text-center h-full relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-spotify-green to-transparent opacity-50"></div>

                    <Target className="w-16 h-16 text-spotify-green mb-4 opacity-80" />
                    <h3 className="text-text-secondary text-lg mb-2">Necesitas generar</h3>
                    <AnimatedCounter
                        value={streamsNeeded}
                        formatter={formatNumber}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary font-mono tracking-tight"
                    />
                    <p className="text-text-muted text-sm uppercase tracking-widest font-bold mt-2">Streams Mensuales</p>

                    <div className="mt-8 p-4 bg-[#222] rounded-lg w-full text-left">
                        <p className="text-xs text-text-secondary mb-2 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Tip de crecimiento:
                        </p>
                        <p className="text-sm text-text-primary">
                            Para llegar a esta meta con audiencia de <strong>Latinoamérica</strong>, necesitas aproximadamente un
                            <span className="text-spotify-green font-bold"> 40% más</span> de volumen que con audiencia de EE.UU.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GoalCalculator;
