import { z } from 'zod';

// ─── Branded Type Infrastructure ────────────────────────────────
//
// Los Branded Types previenen errores de dominio a nivel de compilador.
// Ejemplo: no puedes pasar un valor "Streams" donde se espera "USD".
// Este pattern es DDD (Domain-Driven Design) aplicado a TypeScript.

declare const __brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [__brand]: B };

// ─── Domain Branded Types ───────────────────────────────────────

/** Cantidad de reproducciones (entero >= 0) */
export type Streams = Brand<number, 'Streams'>;

/** Valor monetario en USD */
export type USD = Brand<number, 'USD'>;

/** Tasa de pago por stream (USD/stream) */
export type PayRate = Brand<number, 'PayRate'>;

// ─── Zod Schemas (Validación en Runtime) ────────────────────────

const streamsSchema = z.number().int().nonnegative();
const usdSchema = z.number().nonnegative();
const payRateSchema = z.number().nonnegative();

// ─── Constructor Functions (Type-Safe Factories) ────────────────

/**
 * Crea un valor Streams validado.
 * @throws {ZodError} si el valor no es un entero >= 0
 */
export function createStreams(value: number): Streams {
    return streamsSchema.parse(value) as Streams;
}

/**
 * Crea un valor USD validado.
 * @throws {ZodError} si el valor no es >= 0
 */
export function createUSD(value: number): USD {
    return usdSchema.parse(value) as USD;
}

/**
 * Crea un valor PayRate validado.
 * @throws {ZodError} si el valor no es >= 0
 */
export function createPayRate(value: number): PayRate {
    return payRateSchema.parse(value) as PayRate;
}

// ─── Arithmetic Helpers (Type-Safe Operations) ──────────────────

/** Calcula el ingreso total: streams * rate = USD */
export function calculateRevenue(streams: Streams, rate: PayRate): USD {
    return createUSD(streams * rate);
}

/** Suma dos valores USD */
export function addUSD(a: USD, b: USD): USD {
    return createUSD(a + b);
}

/** Convierte un número crudo a Streams sin validación (para hot paths internos) */
export function unsafeStreams(value: number): Streams {
    return value as Streams;
}

/** Convierte un número crudo a USD sin validación (para hot paths internos) */
export function unsafeUSD(value: number): USD {
    return value as USD;
}

/** Convierte un número crudo a PayRate sin validación (para hot paths internos) */
export function unsafePayRate(value: number): PayRate {
    return value as PayRate;
}
