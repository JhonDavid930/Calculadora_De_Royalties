import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import X from 'lucide-react/dist/esm/icons/x';
import Search from 'lucide-react/dist/esm/icons/search';
import Check from 'lucide-react/dist/esm/icons/check';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Globe from 'lucide-react/dist/esm/icons/globe';
import { COUNTRY_DB } from '../../constants/countries';
import type { CountrySelectorModalProps, Region, Country } from '../../types';

const REGIONS: Region[] = [
    'North America',
    'Latin America',
    'Europe',
    'Asia',
    'Oceania',
    'Africa',
    'Middle East'
];

const CountrySelectorModal = ({ isOpen, onClose, onAddCountries, existingCountries }: CountrySelectorModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [activeRegion, setActiveRegion] = useState<Region | 'All'>('All');

    // Filter available countries based on search and region
    const availableCountries = useMemo(() => {
        const existingCodes = new Set(existingCountries.map(c => c.country));
        return COUNTRY_DB.filter(c =>
            !existingCodes.has(c.name) &&
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (activeRegion === 'All' || c.region === activeRegion)
        );
    }, [searchTerm, activeRegion, existingCountries]);

    // Group available countries by region for structured display
    const groupedCountries = useMemo(() => {
        if (searchTerm || activeRegion !== 'All') return null; // Flat list if searching or filtering

        const groups: Record<string, Country[]> = {};
        REGIONS.forEach(region => {
            const countriesInRegion = availableCountries.filter(c => c.region === region);
            if (countriesInRegion.length > 0) {
                groups[region] = countriesInRegion;
            }
        });
        return groups;
    }, [availableCountries, searchTerm, activeRegion]);

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
        setActiveRegion('All');
        onClose();
    };

    const renderCountryItem = (country: Country) => {
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
                <span className={`text-xs font-mono ml-4 ${isSelected ? 'text-spotify-green/80' : 'text-dark-border'}`}>{country.code}</span>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pt-10 pb-20 md:py-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="bg-dark-surface border border-dark-border w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-[80vh]"
                    >

                        {/* Header */}
                        <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-bg shrink-0">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-spotify-green" />
                                Agregar Regiones y Países
                            </h3>
                            <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className="p-4 border-b border-dark-border bg-dark-bg shrink-0 space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Buscar país por nombre..."
                                    className="w-full bg-dark-surface border border-dark-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-spotify-green focus:ring-1 focus:ring-spotify-green outline-none transition-all placeholder:text-text-muted"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* Regions Scrollable Chips */}
                            <div className="flex gap-2 overflow-x-auto scrolly-none pb-1 -mx-2 px-2 md:mx-0 md:px-0">
                                <button
                                    onClick={() => setActiveRegion('All')}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${activeRegion === 'All' ? 'bg-spotify-green text-black border-spotify-green' : 'bg-transparent text-text-secondary border-dark-border hover:text-white hover:border-gray-500'}`}
                                >
                                    Todos
                                </button>
                                {REGIONS.map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setActiveRegion(region)}
                                        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${activeRegion === region ? 'bg-spotify-green text-black border-spotify-green' : 'bg-transparent text-text-secondary border-dark-border hover:text-white hover:border-gray-500'}`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bulk Actions Bar */}
                        <div className="flex justify-between items-center px-4 py-2 border-b border-dark-border bg-dark-surface text-xs shrink-0 shadow-sm z-10 relative">
                            <span className="text-text-secondary font-medium">
                                {availableCountries.length} {availableCountries.length === 1 ? 'país encontrado' : 'países encontrados'}
                            </span>
                            <button
                                onClick={handleToggleAll}
                                className="font-bold text-spotify-green hover:text-green-400 transition-colors uppercase tracking-wider text-[10px] py-1 px-2 rounded hover:bg-spotify-green/10"
                                disabled={availableCountries.length === 0}
                            >
                                {isAllSelected ? "Deseleccionar esta vista" : "Seleccionar esta vista"}
                            </button>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto p-2 bg-dark-bg/50">
                            {availableCountries.length > 0 ? (
                                groupedCountries ? (
                                    // Grouped View (No strict filters active)
                                    <div className="space-y-6 pb-4">
                                        {Object.entries(groupedCountries).map(([region, countries]) => (
                                            <div key={region} className="space-y-2">
                                                <h4 className="sticky top-0 z-10 bg-dark-bg/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-dark-border/50 rounded-t-lg">
                                                    {region}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
                                                    {countries.map(renderCountryItem)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Flat View (Search or Specific Region Active)
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        {availableCountries.map(renderCountryItem)}
                                    </div>
                                )
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-text-muted p-8">
                                    <Globe className="w-12 h-12 mb-4 opacity-20" />
                                    <p>No se encontraron países para los filtros actuales</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-dark-border bg-dark-bg flex justify-between items-center shrink-0">
                            <span className="text-sm font-medium text-text-primary bg-dark-surface px-3 py-1 rounded-full border border-dark-border">
                                <span className={selectedCodes.length > 0 ? 'text-spotify-green' : ''}>{selectedCodes.length}</span> seleccionados
                            </span>
                            <div className="flex gap-3">
                                <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white transition-colors">
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={selectedCodes.length === 0}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-black transition-all shadow-lg ${selectedCodes.length > 0 ? 'bg-spotify-green hover:bg-spotify-light shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}
                                >
                                    <Plus className="w-4 h-4" />
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CountrySelectorModal;
