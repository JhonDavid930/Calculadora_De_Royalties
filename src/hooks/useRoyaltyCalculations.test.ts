import { renderHook, act } from '@testing-library/react';
import { useRoyaltyCalculations } from './useRoyaltyCalculations';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem(key: string): string | null {
            return store[key] || null;
        },
        setItem(key: string, value: string): void {
            store[key] = value.toString();
        },
        removeItem(key: string): void {
            delete store[key];
        },
        clear(): void {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('useRoyaltyCalculations', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should initialize with empty data', () => {
        const { result } = renderHook(() => useRoyaltyCalculations());
        expect(result.current.totalStreams).toBe(0);
        expect(result.current.totalRevenue).toBe(0);
    });

    it('should add countries correctly', () => {
        const { result } = renderHook(() => useRoyaltyCalculations());

        act(() => {
            result.current.handleAddCountries(['Mexico', 'Spain']);
        });

        expect(result.current.countryData).toHaveLength(2);
        expect(result.current.countryData[0].country).toBe('Mexico');
        expect(result.current.countryData[1].country).toBe('Spain');
    });

    it('should calculate revenue correctly when streams are added', () => {
        const { result } = renderHook(() => useRoyaltyCalculations());

        // 1. Add country
        act(() => {
            result.current.handleAddCountries(['United States']);
        });

        // 2. Update streams (US rate is 0.0040)
        const usId = result.current.countryData[0].id;

        act(() => {
            result.current.updateCountryStream(usId, '1000');
        });

        expect(result.current.totalStreams).toBe(1000);
        // 1000 * 0.0042 = 4.20
        expect(result.current.totalRevenue).toBe(4.20);
    });
});
