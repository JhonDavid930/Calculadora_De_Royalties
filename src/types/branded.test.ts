import { describe, it, expect } from 'vitest';
import {
    createStreams,
    createUSD,
    createPayRate,
    calculateRevenue,
    addUSD,
    unsafeStreams,
    unsafeUSD,
    unsafePayRate,
} from './branded';

describe('branded types', () => {
    describe('createStreams', () => {
        it('should accept a valid non-negative integer', () => {
            expect(createStreams(1000)).toBe(1000);
        });

        it('should accept zero', () => {
            expect(createStreams(0)).toBe(0);
        });

        it('should throw for negative values', () => {
            expect(() => createStreams(-1)).toThrow();
        });

        it('should throw for non-integer values', () => {
            expect(() => createStreams(3.7)).toThrow();
        });
    });

    describe('createUSD', () => {
        it('should accept a valid non-negative value', () => {
            expect(createUSD(4.50)).toBe(4.50);
        });

        it('should accept zero', () => {
            expect(createUSD(0)).toBe(0);
        });

        it('should accept decimal values', () => {
            expect(createUSD(0.0040)).toBeCloseTo(0.004);
        });

        it('should throw for negative values', () => {
            expect(() => createUSD(-0.01)).toThrow();
        });
    });

    describe('createPayRate', () => {
        it('should accept a valid non-negative rate', () => {
            expect(createPayRate(0.004)).toBeCloseTo(0.004);
        });

        it('should accept zero', () => {
            expect(createPayRate(0)).toBe(0);
        });

        it('should throw for negative values', () => {
            expect(() => createPayRate(-1)).toThrow();
        });
    });

    describe('calculateRevenue', () => {
        it('should compute streams * rate correctly (USA: 1000 * 0.004 = 4.00)', () => {
            const streams = createStreams(1000);
            const rate = createPayRate(0.004);
            expect(calculateRevenue(streams, rate)).toBeCloseTo(4.00);
        });

        it('should return 0 when streams is 0', () => {
            const streams = createStreams(0);
            const rate = createPayRate(0.004);
            expect(calculateRevenue(streams, rate)).toBe(0);
        });

        it('should return 0 when rate is 0', () => {
            const streams = createStreams(1000);
            const rate = createPayRate(0);
            expect(calculateRevenue(streams, rate)).toBe(0);
        });

        it('should compute large volume correctly (1M * 0.004 = 4000)', () => {
            const streams = createStreams(1_000_000);
            const rate = createPayRate(0.004);
            expect(calculateRevenue(streams, rate)).toBeCloseTo(4000);
        });
    });

    describe('addUSD', () => {
        it('should sum two USD values', () => {
            const a = createUSD(1.50);
            const b = createUSD(2.50);
            expect(addUSD(a, b)).toBeCloseTo(4.00);
        });

        it('should handle adding zero', () => {
            const a = createUSD(5.00);
            const b = createUSD(0);
            expect(addUSD(a, b)).toBeCloseTo(5.00);
        });
    });

    describe('unsafe helpers', () => {
        it('unsafeStreams should return the raw value without validation', () => {
            expect(unsafeStreams(999)).toBe(999);
        });

        it('unsafeUSD should return the raw value without validation', () => {
            expect(unsafeUSD(0)).toBe(0);
        });

        it('unsafePayRate should return the raw value without validation', () => {
            expect(unsafePayRate(0.001)).toBeCloseTo(0.001);
        });
    });
});
