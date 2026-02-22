import { useState, useMemo, useEffect } from 'react';
import currency from 'currency.js';
import { z } from 'zod';
import { COUNTRY_DB } from '../constants/countries';

const STORAGE_KEY = 'royalty_pro_advanced_data';

// Schema para validación de datos de país
const CountryDataSchema = z.object({
    id: z.number(),
    country: z.string(),
    streams: z.number().min(0, { message: "Streams cannot be negative" }),
    rate: z.number().min(0),
    tier: z.number().nullable(),
});

export const useRoyaltyCalculations = () => {
    // Inicialización inteligente desde localStorage
    const [countryData, setCountryData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validamos que el formato sea correcto (Array y tenga al menos un elemento)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Error loading from localStorage", e);
        }
        return [{ id: 1, country: '', streams: 0, rate: 0, tier: null }];
    });

    // Guardar automáticamente cuando cambien los datos
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(countryData));
    }, [countryData]);

    const totalStreams = countryData.reduce((acc, curr) => acc + curr.streams, 0);

    const totalRevenue = countryData.reduce((acc, curr) => {
        const rowRevenue = currency(curr.streams).multiply(curr.rate);
        return currency(acc).add(rowRevenue).value;
    }, 0);

    const effectiveRPM = (() => {
        if (totalStreams === 0) return 0;
        // (Total Revenue / Total Streams) * 1000
        return currency(totalRevenue).divide(totalStreams).multiply(1000).value;
    })();

    const chartData = useMemo(() => {
        const data = countryData
            .filter(item => item.country && item.streams > 0)
            .map(item => ({
                name: item.country,
                value: currency(item.streams).multiply(item.rate).value
            }))
            .sort((a, b) => b.value - a.value);

        return data.length > 0 ? data : [{ name: 'Sin datos', value: 1 }];
    }, [countryData]);

    const updateCountryStream = (id, newVal) => {
        const val = Number(newVal);
        // Validación rápida antes de actualizar el estado
        if (isNaN(val)) return;

        setCountryData(prev => prev.map(c =>
            c.id === id ? { ...c, streams: Math.max(0, val) } : c
        ));
    };

    const updateCountryRate = (id, newRate) => {
        const val = Number(newRate);
        if (isNaN(val)) return;

        setCountryData(prev => prev.map(c =>
            c.id === id ? { ...c, rate: Math.max(0, val) } : c
        ));
    };

    const selectCountry = (id, countryName) => {
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

    const handleAddCountries = (countryNames) => {
        const newCountries = countryNames.map((name, index) => {
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

    const addEmptyRow = () => {
        const newId = Date.now();
        setCountryData([...countryData, { id: newId, country: '', streams: 0, rate: 0, tier: null }]);
    };

    const removeCountry = (id) => {
        if (countryData.length > 1) {
            setCountryData(countryData.filter(c => c.id !== id));
        } else {
            setCountryData([{ id: Date.now(), country: '', streams: 0, rate: 0, tier: null }]);
        }
    };

    const resetData = () => {
        localStorage.removeItem(STORAGE_KEY);
        setCountryData([{ id: Date.now(), country: '', streams: 0, rate: 0, tier: null }]);
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
        // Exportamos el schema por si se necesita en el componente para validación visual
        CountryDataSchema
    };
};
