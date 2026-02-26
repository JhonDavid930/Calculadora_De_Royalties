import '@testing-library/jest-dom';
import React from 'react';

// Mock window.matchMedia (not available in jsdom)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
});

import { vi } from 'vitest';

vi.mock('virtual:pwa-register/react', () => ({
    useRegisterSW: () => ({
        needRefresh: [false, vi.fn()],
        offlineReady: [false, vi.fn()],
        updateServiceWorker: vi.fn(),
    }),
}));

/**
 * Mock AnimatedCounter para que renderice el valor formateado
 * de forma síncrona (sin spring animations) en entorno jsdom.
 */
vi.mock('./components/ui/AnimatedCounter', () => ({
    default: ({ value, formatter, className }: { value: number; formatter: (n: number) => string; className?: string }) => {
        return React.createElement('span', { className }, formatter(value));
    },
}));

/**
 * Mock mínimo de motion/react para jsdom:
 * - motion.div/span/button → renderiza el elemento nativo ignorando props de motion
 * - AnimatePresence → renderiza children directamente
 */
vi.mock('motion/react', () => {
    const motionHandler: ProxyHandler<object> = {
        get(_: object, tag: string) {
            return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
                const filteredProps: Record<string, unknown> = {};
                for (const [key, val] of Object.entries(props)) {
                    if (
                        !key.startsWith('while') &&
                        key !== 'initial' &&
                        key !== 'animate' &&
                        key !== 'exit' &&
                        key !== 'transition' &&
                        key !== 'variants' &&
                        key !== 'layout' &&
                        key !== 'layoutId'
                    ) {
                        filteredProps[key] = val;
                    }
                }
                filteredProps.ref = ref;
                return React.createElement(tag, filteredProps);
            });
        },
    };

    const motion = new Proxy({}, motionHandler);

    return {
        motion,
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
        useMotionValue: (init: number) => ({
            get: () => init,
            set: () => { /* noop */ },
            on: () => () => { /* noop */ },
        }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        useSpring: (mv: ReturnType<typeof Object>) => mv,
        useTransform: (_: unknown, fn: (v: number) => string) => ({
            get: () => fn(0),
            on: () => () => { /* noop */ },
        }),
    };
});
