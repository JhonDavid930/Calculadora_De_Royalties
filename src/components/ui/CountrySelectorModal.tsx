import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import X from 'lucide-react/dist/esm/icons/x';
import Search from 'lucide-react/dist/esm/icons/search';
import Check from 'lucide-react/dist/esm/icons/check';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Globe from 'lucide-react/dist/esm/icons/globe';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
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
    const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(new Set());

    const existingCodes = useMemo(() => new Set(existingCountries.map(c => c.country)), [existingCountries]);

    // Filter available countries based on search and region
    const availableCountries = useMemo(() => {
        return COUNTRY_DB.filter(c =>
            !existingCodes.has(c.name) &&
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (activeRegion === 'All' || c.region === activeRegion)
        );
    }, [searchTerm, activeRegion, existingCodes]);

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

    // Performance: Set for O(1) selection checks
    const selectedSet = useMemo(() => new Set(selectedCodes), [selectedCodes]);

    const isAllSelected = availableCountries.length > 0 && availableCountries.every(c => selectedSet.has(c.name));

    const handleToggleAll = useCallback((): void => {
        if (isAllSelected) {
            const visibleNames = new Set(availableCountries.map(c => c.name));
            setSelectedCodes(prev => prev.filter(name => !visibleNames.has(name)));
        } else {
            const newSelected = new Set(selectedCodes);
            availableCountries.forEach(c => newSelected.add(c.name));
            setSelectedCodes(Array.from(newSelected));
        }
    }, [isAllSelected, availableCountries, selectedCodes]);

    const handleSelect = useCallback((countryName: string): void => {
        setSelectedCodes(prev => {
            if (prev.includes(countryName)) {
                return prev.filter(c => c !== countryName);
            } else {
                return [...prev, countryName];
            }
        });
    }, []);

    const handleAdd = (): void => {
        onAddCountries(selectedCodes);
        setSelectedCodes([]);
        setSearchTerm('');
        setActiveRegion('All');
        onClose();
    };

    const toggleRegion = (region: string) => {
        setCollapsedRegions(prev => {
            const next = new Set(prev);
            if (next.has(region)) {
                next.delete(region);
            } else {
                next.add(region);
            }
            return next;
        });
    };

    const toggleAllRegions = () => {
        if (groupedCountries) {
            const visibleRegions = Object.keys(groupedCountries);
            if (collapsedRegions.size === visibleRegions.length) {
                setCollapsedRegions(new Set()); // Expand all
            } else {
                setCollapsedRegions(new Set(visibleRegions)); // Collapse all
            }
        }
    };

    const renderCountryItem = useCallback((country: Country) => {
        const isSelected = selectedSet.has(country.name);
        
        return (
            <div
                key={country.code}
                onClick={() => handleSelect(country.name)}
                role="option"
                aria-selected={isSelected}
                className={`flex items-center justify-between p-3 rounded-lg transition-all border ${isSelected ? 'bg-green-900/20 border-spotify-green/50 cursor-pointer' : 'bg-transparent border-transparent hover:bg-dark-hover cursor-pointer'}`}
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
                <span className={`text-xs font-mono ml-4 ${isSelected ? 'text-spotify-green font-bold drop-shadow-[0_0_8px_rgba(29,185,84,0.8)]' : 'text-spotify-green/60'}`}>{country.code}</span>
            </div>
        );
    }, [selectedSet, handleSelect]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={onClose}
                    style={{ height: '100dvh' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto_auto_auto_1fr_auto]"
                        style={{ height: 'min(80vh, calc(100dvh - 2rem))' }}
                    >

                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-spotify-green" />
                                Agregar Regiones y Países
                            </h3>
                            <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className="px-3 py-3 sm:p-4 border-b border-white/5 bg-[#0a0a0a] space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar país por nombre..."
                                    className="w-full bg-[#181818] border border-white/20 hover:border-white/30 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-spotify-green focus:ring-1 focus:ring-spotify-green outline-none transition-all placeholder:text-text-secondary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* Regions Scrollable Chips */}
                            <div
                                className="chips-scroll flex gap-2 overflow-x-scroll pb-2"
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#1DB954 #181818'
                                }}
                            >
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
                        <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-[#121212] text-xs shadow-sm z-10 relative">
                            <span className="text-text-secondary font-medium">
                                {availableCountries.length} {availableCountries.length === 1 ? 'país encontrado' : 'países encontrados'}
                            </span>
                            <div className="flex items-center gap-2">
                                {groupedCountries && (
                                    <button
                                        onClick={toggleAllRegions}
                                        className="font-bold text-text-muted hover:text-white transition-colors uppercase tracking-wider text-[10px] py-1 px-2 rounded hover:bg-dark-hover border border-transparent hover:border-dark-border"
                                    >
                                        {collapsedRegions.size === Object.keys(groupedCountries).length ? "Expandir Regiones" : "Contraer Regiones"}
                                    </button>
                                )}
                                <button
                                    onClick={handleToggleAll}
                                    className={`font-bold uppercase tracking-wider text-[10px] py-1 px-2 rounded transition-colors ${availableCountries.length === 0 ? 'text-text-muted cursor-not-allowed' : 'text-spotify-green hover:text-green-400 hover:bg-spotify-green/10'}`}
                                    disabled={availableCountries.length === 0}
                                >
                                    {isAllSelected ? "Deseleccionar esta vista" : "Seleccionar esta vista"}
                                </button>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="overflow-y-auto p-3 bg-[#0a0a0a]">
                            {availableCountries.length > 0 ? (
                                groupedCountries ? (
                                    // Grouped View (No strict filters active)
                                    <div className="space-y-4 pb-4">
                                        {Object.entries(groupedCountries).map(([region, countries]) => {
                                            const isCollapsed = collapsedRegions.has(region);
                                            return (
                                                <div key={region} className="space-y-1 bg-[#121212] rounded-lg border border-white/5 overflow-hidden">
                                                    <div
                                                        className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm px-3 py-2 border-b border-white/5 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                                                        onClick={() => toggleRegion(region)}
                                                    >
                                                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                                                            {region}
                                                            <span className="text-[10px] font-normal text-text-muted bg-dark-hover px-1.5 py-0.5 rounded-full">{countries.length}</span>
                                                        </h4>
                                                        <button className="text-text-muted hover:text-white transition-colors">
                                                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                    <AnimatePresence initial={false}>
                                                        {!isCollapsed && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="px-1 pb-1"
                                                            >
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                                                    {countries.map(renderCountryItem)}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
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
                        <div className="p-4 border-t border-white/5 bg-[#0a0a0a] flex justify-between items-center">
                            <span className="text-sm font-medium text-text-primary bg-[#121212] px-3 py-1 rounded-full border border-white/10">
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
                </div>
            )}
        </AnimatePresence>
    );
};

export default CountrySelectorModal;
