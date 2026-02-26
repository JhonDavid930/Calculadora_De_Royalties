import type { LucideIcon } from 'lucide-react';

// ─── Re-export Branded Types ────────────────────────────────────
export type { Streams, USD, PayRate } from './branded';
export { createStreams, createUSD, createPayRate, calculateRevenue, addUSD, unsafeStreams, unsafeUSD, unsafePayRate } from './branded';

// ─── Domain Types ───────────────────────────────────────────────

/** Tier de pago de un país (1 = más alto, 5 = más bajo) */
export type CountryTier = 1 | 2 | 3 | 4 | 5;

/** País en la base de datos estática con su rate estimado */
export interface Country {
    name: string;
    rate: number;
    tier: CountryTier;
    code: string;
}

/** Fila de datos de país en la calculadora (estado mutable) */
export interface CountryData {
    id: number;
    country: string;
    streams: number;
    rate: number;
    tier: number | null;
}

/** Punto de datos para la gráfica de distribución */
export interface ChartDataPoint {
    name: string;
    value: number;
}

// ─── Component Prop Types ───────────────────────────────────────

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export interface StatBoxProps {
    label: string;
    value: string;
    subtext?: string;
    icon?: LucideIcon;
    highlight?: boolean;
}

export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string | null;
    cancelText?: string;
}

export interface CountrySelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCountries: (countryNames: string[]) => void;
    existingCountries: CountryData[];
}

// ─── Hook Return Type ───────────────────────────────────────────

export interface UseRoyaltyCalculationsReturn {
    countryData: CountryData[];
    totalStreams: number;
    totalRevenue: number;
    effectiveRPM: number;
    chartData: ChartDataPoint[];
    updateCountryStream: (id: number, newVal: string) => void;
    updateCountryRate: (id: number, newRate: string) => void;
    selectCountry: (id: number, countryName: string) => void;
    handleAddCountries: (countryNames: string[]) => void;
    addEmptyRow: () => void;
    removeCountry: (id: number) => void;
    resetData: () => void;
}
