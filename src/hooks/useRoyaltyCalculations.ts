import { useState, useMemo, useEffect } from 'react';
import currency from 'currency.js';
import { COUNTRY_DB } from '../constants/countries';
import type { CountryData, ChartDataPoint, UseRoyaltyCalculationsReturn } from '../types';

const STORAGE_KEY = 'royalty_pro_advanced_data';

const createEmptyRow = (): CountryData => ({
    id: Date.now(),
    country: '',
    streams: 0,
    rate: 0,
    tier: null,
});

export const useRoyaltyCalculations = (): UseRoyaltyCalculationsReturn => {
    // Inicialización inteligente desde localStorage
    const [countryData, setCountryData] = useState<CountryData[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as CountryData[];
                // Validamos que el formato sea correcto (Array y tenga al menos un elemento)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Error loading from localStorage", e);
        }
        return [createEmptyRow()];
    });

    // Guardar automáticamente cuando cambien los datos
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(countryData));
    }, [countryData]);

    const totalStreams: number = countryData.reduce((acc, curr) => acc + curr.streams, 0);

    const totalRevenue: number = countryData.reduce((acc, curr) => {
        const rowRevenue = currency(curr.streams).multiply(curr.rate);
        return currency(acc).add(rowRevenue).value;
    }, 0);

    const effectiveRPM: number = (() => {
        if (totalStreams === 0) return 0;
        return currency(totalRevenue).divide(totalStreams).multiply(1000).value;
    })();

    const chartData = useMemo((): ChartDataPoint[] => {
        const data = countryData
            .filter(item => item.country && item.streams > 0)
            .map(item => ({
                name: item.country,
                value: currency(item.streams).multiply(item.rate).value
            }))
            .sort((a, b) => b.value - a.value);

        return data.length > 0 ? data : [{ name: 'Sin datos', value: 1 }];
    }, [countryData]);

    const updateCountryStream = (id: number, newVal: string): void => {
        const val = Number(newVal);
        if (isNaN(val)) return;

        setCountryData(prev => prev.map(c =>
            c.id === id ? { ...c, streams: Math.max(0, val) } : c
        ));
    };

    const updateCountryRate = (id: number, newRate: string): void => {
        const val = Number(newRate);
        if (isNaN(val)) return;

        setCountryData(prev => prev.map(c =>
            c.id === id ? { ...c, rate: Math.max(0, val) } : c
        ));
    };

    const selectCountry = (id: number, countryName: string): void => {
        const dbCountry = COUNTRY_DB.find(c => c.name === countryName);

        setCountryData(prev => prev.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    country: countryName,
                    rate: dbCountry ? dbCountry.rate : 0,
                    tier: dbCountry ? dbCountry.tier : null
                };
            }
            return c;
        }));
    };

    const handleAddCountries = (countryNames: string[]): void => {
        const newCountries: CountryData[] = countryNames.map((name, index) => {
            const dbCountry = COUNTRY_DB.find(c => c.name === name);
            const newId = Date.now() + index;
            return {
                id: newId,
                country: name,
                streams: 0,
                rate: dbCountry ? dbCountry.rate : 0,
                tier: dbCountry ? dbCountry.tier : null
            };
        });

        setCountryData(prev => {
            if (prev.length === 1 && !prev[0].country) {
                return newCountries;
            }
            return [...prev, ...newCountries];
        });
    };

    const addEmptyRow = (): void => {
        setCountryData(prev => [...prev, createEmptyRow()]);
    };

    const removeCountry = (id: number): void => {
        if (countryData.length > 1) {
            setCountryData(countryData.filter(c => c.id !== id));
        } else {
            setCountryData([createEmptyRow()]);
        }
    };

    const resetData = (): void => {
        localStorage.removeItem(STORAGE_KEY);
        setCountryData([createEmptyRow()]);
    };

    return {
        countryData,
        totalStreams,
        totalRevenue,
        effectiveRPM,
        chartData,
        updateCountryStream,
        updateCountryRate,
        selectCountry,
        handleAddCountries,
        addEmptyRow,
        removeCountry,
        resetData,
    };
};
