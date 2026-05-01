import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import X from 'lucide-react/dist/esm/icons/x';
import Search from 'lucide-react/dist/esm/icons/search';
import Check from 'lucide-react/dist/esm/icons/check';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Globe from 'lucide-react/dist/esm/icons/globe';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ChevronsRight from 'lucide-react/dist/esm/icons/chevrons-right';
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

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center overflow-x-auto overflow-y-auto px-2.5 py-3 sm:px-6 sm:py-8 md:py-10 max-[319px]:justify-start"
                    onClick={onClose}
                    style={{ height: '100dvh' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto_auto_auto_1fr_auto] max-[319px]:min-w-[20rem] h-[min(88dvh,calc(100dvh-1.5rem))] sm:h-[min(82dvh,calc(100dvh-3rem))] md:h-[min(78vh,calc(100dvh-5rem))]"
                    >

                        {/* Header */}
                        <div className="min-w-0 w-full p-3 sm:p-4 border-b border-white/5 flex justify-between items-center gap-3 bg-[#0a0a0a] overflow-hidden">
                            <h3 className="min-w-0 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-spotify-green flex-shrink-0" />
                                Agregar Regiones y Países
                            </h3>
                            <button onClick={onClose} aria-label="Cerrar selector" className="text-text-secondary hover:text-white transition-colors flex-shrink-0">
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className="min-w-0 w-full px-3 py-2.5 sm:p-4 border-b border-white/5 bg-[#0a0a0a] space-y-2.5 sm:space-y-3 overflow-hidden">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar país por nombre..."
                                    className="w-full min-w-0 bg-[#181818] border border-white/20 hover:border-white/30 rounded-lg pl-9 pr-3 sm:pl-10 sm:pr-4 py-2.5 sm:py-3 text-sm text-white focus:border-spotify-green focus:ring-1 focus:ring-spotify-green outline-none transition-all placeholder:text-text-secondary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Regions Scrollable Chips */}
                            <div className="relative">
                                <div
                                    className="chips-scroll flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 pr-10 snap-x snap-mandatory"
                                    style={{
                                        WebkitOverflowScrolling: 'touch',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#1DB954 #181818'
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveRegion('All')}
                                        className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${activeRegion === 'All' ? 'bg-spotify-green text-black border-spotify-green' : 'bg-transparent text-text-secondary border-dark-border hover:text-white hover:border-gray-500'}`}
                                    >
                                        Todos
                                    </button>
                                    {REGIONS.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => setActiveRegion(region)}
                                            className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${activeRegion === region ? 'bg-spotify-green text-black border-spotify-green' : 'bg-transparent text-text-secondary border-dark-border hover:text-white hover:border-gray-500'}`}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-14 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
                                <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full border border-white/10 bg-[#121212]/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-spotify-green shadow-lg shadow-black/30 sm:hidden">
                                    <span>Desliza</span>
                                    <ChevronsRight className="w-3 h-3" />
                                </div>
                            </div>
                            <p className="text-[11px] text-text-muted sm:hidden">
                                Desliza horizontalmente para ver todas las regiones.
                            </p>
                        </div>

                        {/* Bulk Actions Bar */}
                        <div className="min-w-0 w-full flex flex-col gap-2 px-3 sm:px-4 py-2 border-b border-white/5 bg-[#121212] text-xs shadow-sm z-10 relative sm:flex-row sm:items-center sm:justify-between overflow-hidden">
                            <span className="text-text-secondary font-medium">
                                {availableCountries.length} {availableCountries.length === 1 ? 'país encontrado' : 'países encontrados'}
                            </span>
                            <div className="min-w-0 flex w-full flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end">
                                {groupedCountries && (
                                    <button
                                        onClick={toggleAllRegions}
                                        className="font-bold text-text-muted hover:text-white transition-colors uppercase tracking-wider text-[10px] py-1 px-2 rounded hover:bg-dark-hover border border-transparent hover:border-dark-border"
                                    >
                                        {collapsedRegions.size === Object.keys(groupedCountries).length ? (
                                            <>
                                                <span className="lg:hidden">Expandir</span>
                                                <span className="hidden lg:inline">Expandir Regiones</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="lg:hidden">Contraer</span>
                                                <span className="hidden lg:inline">Contraer Regiones</span>
                                            </>
                                        )}
                                    </button>
                                )}
                                <button
                                    onClick={handleToggleAll}
                                    className={`font-bold uppercase tracking-wider text-[10px] py-1 px-2 rounded transition-colors ${availableCountries.length === 0 ? 'text-text-muted cursor-not-allowed' : 'text-spotify-green hover:text-green-400 hover:bg-spotify-green/10'}`}
                                    disabled={availableCountries.length === 0}
                                >
                                    {isAllSelected ? (
                                        <>
                                            <span className="md:hidden">Deseleccionar</span>
                                            <span className="hidden md:inline lg:hidden">Deseleccionar vista</span>
                                            <span className="hidden lg:inline">Deseleccionar esta vista</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="md:hidden">Seleccionar</span>
                                            <span className="hidden md:inline lg:hidden">Seleccionar vista</span>
                                            <span className="hidden lg:inline">Seleccionar esta vista</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="min-w-0 w-full overflow-x-hidden overflow-y-auto p-2.5 sm:p-3 bg-[#0a0a0a]">
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
                        <div className="min-w-0 w-full flex items-center gap-2 border-t border-white/5 bg-[#0a0a0a] p-3 sm:p-4 sm:justify-between overflow-hidden max-[359px]:flex-col max-[359px]:items-start">
                            <span className="text-sm font-medium text-text-primary bg-[#121212] px-3 py-1 rounded-full border border-white/10 shrink-0">
                                <span className={selectedCodes.length > 0 ? 'text-spotify-green' : ''}>{selectedCodes.length}</span> seleccionados
                            </span>
                            <div className="ml-auto flex min-w-0 max-w-full flex-1 justify-end gap-2 sm:flex-none sm:gap-3 max-[359px]:ml-0 max-[359px]:w-full max-[359px]:justify-between">
                                <button onClick={onClose} className="rounded-lg px-3 py-2 text-xs sm:px-4 sm:text-sm font-medium text-text-secondary transition-colors hover:text-white">
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={selectedCodes.length === 0}
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs sm:px-6 sm:text-sm font-bold text-black transition-all shadow-lg ${selectedCodes.length > 0 ? 'bg-spotify-green hover:bg-spotify-light shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}
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

    return createPortal(modalContent, document.body);
};

export default CountrySelectorModal;
