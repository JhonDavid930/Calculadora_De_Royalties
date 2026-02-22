import { useState, useMemo } from 'react';
import X from 'lucide-react/dist/esm/icons/x';
import Search from 'lucide-react/dist/esm/icons/search';
import Check from 'lucide-react/dist/esm/icons/check';
import Plus from 'lucide-react/dist/esm/icons/plus';
import { COUNTRY_DB } from '../../constants/countries';
import type { CountrySelectorModalProps } from '../../types';

const CountrySelectorModal = ({ isOpen, onClose, onAddCountries, existingCountries }: CountrySelectorModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

    const availableCountries = useMemo(() => {
        const existingCodes = new Set(existingCountries.map(c => c.country));
        return COUNTRY_DB.filter(c =>
            !existingCodes.has(c.name) &&
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, existingCountries]);

    const isAllSelected = availableCountries.length > 0 && availableCountries.every(c => selectedCodes.includes(c.name));

    const handleToggleAll = (): void => {
        if (isAllSelected) {
            const visibleNames = new Set(availableCountries.map(c => c.name));
            setSelectedCodes(prev => prev.filter(name => !visibleNames.has(name)));
        } else {
            const newSelected = new Set(selectedCodes);
            availableCountries.forEach(c => newSelected.add(c.name));
            setSelectedCodes(Array.from(newSelected));
        }
    };

    const handleSelect = (countryName: string): void => {
        setSelectedCodes(prev => {
            if (prev.includes(countryName)) {
                return prev.filter(c => c !== countryName);
            } else {
                return [...prev, countryName];
            }
        });
    };

    const handleAdd = (): void => {
        onAddCountries(selectedCodes);
        setSelectedCodes([]);
        setSearchTerm('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-dark-surface border border-dark-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-bg">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Plus className="w-5 h-5 text-spotify-green" />
                        Agregar Países
                    </h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-dark-border bg-dark-bg">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Buscar país..."
                            className="w-full bg-dark-surface border border-dark-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-spotify-green focus:ring-1 focus:ring-spotify-green outline-none transition-all placeholder:text-text-muted"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Bulk Actions Bar */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-dark-border bg-dark-bg text-xs sticky top-0 z-10">
                    <span className="text-text-secondary">
                        {availableCountries.length} países encontrados
                    </span>
                    <button
                        onClick={handleToggleAll}
                        className="font-bold text-spotify-green hover:text-green-400 transition-colors uppercase tracking-wider text-[10px]"
                        disabled={availableCountries.length === 0}
                    >
                        {isAllSelected ? "Deseleccionar todo" : "Seleccionar todo"}
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {availableCountries.length > 0 ? (
                        availableCountries.map(country => {
                            const isSelected = selectedCodes.includes(country.name);
                            return (
                                <div
                                    key={country.code}
                                    onClick={() => handleSelect(country.name)}
                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${isSelected ? 'bg-green-900/20 border-spotify-green/50' : 'bg-transparent border-transparent hover:bg-dark-hover'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-spotify-green border-spotify-green' : 'border-text-muted'}`}>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${isSelected ? 'text-spotify-green' : 'text-text-primary'}`}>{country.name}</p>
                                            <p className="text-xs text-text-secondary">Tier {country.tier} • Est. ${country.rate}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-dark-border font-mono">{country.code}</span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-text-muted">
                            <p>No se encontraron países</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-dark-border bg-dark-bg flex justify-between items-center">
                    <span className="text-sm text-text-secondary">
                        {selectedCodes.length} seleccionados
                    </span>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white transition-colors">
                            Cancelar
                        </button>
                        <button
                            onClick={handleAdd}
                            disabled={selectedCodes.length === 0}
                            className={`px-6 py-2 rounded-lg text-sm font-bold text-black transition-all shadow-lg ${selectedCodes.length > 0 ? 'bg-spotify-green hover:bg-spotify-light shadow-green-900/20' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}
                        >
                            Agregar Selección
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountrySelectorModal;
