import React from 'react';
import { Trash2 } from 'lucide-react';

const CompactCountryList = ({ countries, onUpdateStream, onUpdateRate, onRemove }) => {
    if (countries.length === 0) return null;

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="mt-8 animate-fadeIn">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3 px-1">
                Otros Países ({countries.length})
            </h3>

            <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
                {/* Header PC */}
                <div className="hidden md:grid grid-cols-12 gap-4 border-b border-dark-border bg-black/20 p-3 text-xs font-bold text-text-secondary tracking-wide">
                    <div className="col-span-4">PAÍS</div>
                    <div className="col-span-3 text-right">STREAMS</div>
                    <div className="col-span-3 text-right">RATE ($)</div>
                    <div className="col-span-2 text-right">TOTAL</div>
                </div>

                <div className="divide-y divide-dark-border">
                    {countries.map((item) => (
                        <div
                            key={item.id}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-3 md:p-3 hover:bg-dark-hover transition-colors items-center relative"
                        >
                            {/* Country Name & Tier */}
                            <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-start gap-2">
                                <span className="font-medium text-text-primary text-sm">{item.country}</span>
                                {item.tier && (
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded border border-dark-border bg-dark-bg text-text-secondary`}>
                                        T{item.tier}
                                    </span>
                                )}
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="md:hidden p-1.5 text-text-muted hover:text-red-500 rounded-full bg-dark-bg border border-dark-border"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Streams Input */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block md:hidden text-[10px] text-text-secondary mb-1">Streams</label>
                                <input
                                    type="number"
                                    className="bg-dark-bg border border-dark-border focus:border-spotify-green rounded px-2 py-1 text-right w-full text-sm text-text-primary outline-none transition-colors"
                                    value={item.streams || ''}
                                    placeholder="0"
                                    onChange={(e) => onUpdateStream(item.id, e.target.value)}
                                />
                            </div>

                            {/* Rate Input */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block md:hidden text-[10px] text-text-secondary mb-1">Rate</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    className="bg-transparent border-0 border-b border-transparent focus:border-dark-border text-right w-full text-xs text-text-secondary focus:text-text-primary outline-none"
                                    value={item.rate || ''}
                                    onChange={(e) => onUpdateRate(item.id, e.target.value)}
                                />
                            </div>

                            {/* Total & Action */}
                            <div className="col-span-12 md:col-span-2 flex justify-between md:justify-end items-center mt-1 md:mt-0">
                                <span className="md:hidden text-xs font-bold text-text-secondary">Total:</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-spotify-green font-bold text-sm">
                                        {formatCurrency(item.streams * item.rate)}
                                    </span>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="hidden md:block p-1.5 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompactCountryList;
