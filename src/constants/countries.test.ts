import { describe, it, expect } from 'vitest';
import { COUNTRY_DB, COLORS } from './countries';

describe('countries constants', () => {
    describe('COUNTRY_DB', () => {
        it('should contain at least 40 countries', () => {
            expect(COUNTRY_DB.length).toBeGreaterThanOrEqual(40);
        });

        it('should have valid tier values (1-5)', () => {
            COUNTRY_DB.forEach((country) => {
                expect(country.tier).toBeGreaterThanOrEqual(1);
                expect(country.tier).toBeLessThanOrEqual(5);
            });
        });

        it('should have positive rates for all countries', () => {
            COUNTRY_DB.forEach((country) => {
                expect(country.rate).toBeGreaterThan(0);
            });
        });

        it('should have unique country codes', () => {
            const codes = COUNTRY_DB.map(c => c.code);
            const uniqueCodes = new Set(codes);
            expect(uniqueCodes.size).toBe(codes.length);
        });

        it('should have unique country names', () => {
            const names = COUNTRY_DB.map(c => c.name);
            const uniqueNames = new Set(names);
            expect(uniqueNames.size).toBe(names.length);
        });

        it('should have Tier 1 rates higher than Tier 5', () => {
            const tier1 = COUNTRY_DB.filter(c => c.tier === 1);
            const tier5 = COUNTRY_DB.filter(c => c.tier === 5);
            const avgTier1 = tier1.reduce((s, c) => s + c.rate, 0) / tier1.length;
            const avgTier5 = tier5.reduce((s, c) => s + c.rate, 0) / tier5.length;
            expect(avgTier1).toBeGreaterThan(avgTier5);
        });

        it('should contain key countries (US, MX, BR, DE)', () => {
            const codes = COUNTRY_DB.map(c => c.code);
            expect(codes).toContain('US');
            expect(codes).toContain('MX');
            expect(codes).toContain('BR');
            expect(codes).toContain('DE');
        });
    });

    describe('COLORS', () => {
        it('should have at least 5 colors', () => {
            expect(COLORS.length).toBeGreaterThanOrEqual(5);
        });

        it('should have valid hex color format', () => {
            COLORS.forEach((color) => {
                expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
            });
        });
    });
});
