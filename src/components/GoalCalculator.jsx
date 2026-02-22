import React, { useState } from 'react';
import Target from 'lucide-react/dist/esm/icons/target';
import Info from 'lucide-react/dist/esm/icons/info';

const GoalCalculator = () => {
    const [goalAmount, setGoalAmount] = useState('1000');
    const [goalAvgRate, setGoalAvgRate] = useState(0.0025);

    const formatNumber = (val) => new Intl.NumberFormat('en-US').format(val);

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
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
                                    className="w-full bg-dark-surface border border-dark-hover rounded-md py-4 pl-10 pr-4 text-2xl font-bold text-text-primary focus:outline-none focus:border-spotify-green"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Tu Perfil de Audiencia (RPM)</label>
                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    { label: 'Tier 1 (US/UK/EU)', val: 0.0040, desc: 'Mayoría audiencia anglosajona' },
                                    { label: 'Tier 3 (LatAm/Mix)', val: 0.0025, desc: 'Mix España, México, Chile' },
                                    { label: 'Tier 5 (Viral/Free)', val: 0.0012, desc: 'Alta proporción cuentas gratis' }
                                ].map((option) => (
                                    <button
                                        key={option.val}
                                        onClick={() => setGoalAvgRate(option.val)}
                                        className={`p-3 rounded-md text-left border transition-all ${goalAvgRate === option.val
                                            ? 'bg-spotify-green/10 border-spotify-green'
                                            : 'bg-dark-surface border-dark-border hover:border-text-muted'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`font-bold ${goalAvgRate === option.val ? 'text-spotify-green' : 'text-text-primary'}`}>{option.label}</span>
                                            <span className="text-sm font-mono opacity-70 text-text-secondary">${option.val}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary mt-1">{option.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-dark-surface p-8 rounded-2xl border border-dark-border flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-spotify-green to-transparent opacity-50"></div>

                    <Target className="w-16 h-16 text-spotify-green mb-4 opacity-80" />
                    <h3 className="text-text-secondary text-lg mb-2">Necesitas generar</h3>
                    <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2 font-mono tracking-tight">
                        {formatNumber(Math.ceil((Number(goalAmount) || 0) / goalAvgRate))}
                    </div>
                    <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Streams Mensuales</p>

                    <div className="mt-8 p-4 bg-[#222] rounded-lg w-full text-left">
                        <p className="text-xs text-text-secondary mb-2 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Tip de crecimiento:
                        </p>
                        <p className="text-sm text-text-primary">
                            Para llegar a esta meta con audiencia de <strong>Latinoamérica</strong>, necesitas aproximadamente un
                            <span className="text-spotify-green font-bold"> 40% más</span> de volumen que con audiencia de EE.UU.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalCalculator;
