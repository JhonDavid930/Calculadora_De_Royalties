import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock PWA virtual module for ReloadPrompt
vi.mock('virtual:pwa-register/react', () => ({
    useRegisterSW: () => ({
        needRefresh: [false],
        updateServiceWorker: vi.fn(),
    }),
}));

// Mock recharts (AdvancedCalculator uses it)
vi.mock('recharts', () => ({
    PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({ children }: { children: React.ReactNode }) => <div data-testid="pie">{children}</div>,
    Cell: () => <div data-testid="cell" />,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
    Tooltip: () => <div data-testid="tooltip" />,
}));

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem(key: string): string | null { return store[key] || null; },
        setItem(key: string, value: string): void { store[key] = value; },
        removeItem(key: string): void { delete store[key]; },
        clear(): void { store = {}; },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

import App from './App';

describe('App', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should render the app title "RoyaltyPro"', () => {
        render(<App />);
        const titles = screen.getAllByText(/RoyaltyPro/);
        expect(titles.length).toBeGreaterThanOrEqual(1);
    });

    it('should render all 3 navigation tabs', () => {
        render(<App />);
        expect(screen.getByText('Rápido')).toBeInTheDocument();
        expect(screen.getByText('Detallado')).toBeInTheDocument();
        expect(screen.getByText('Metas')).toBeInTheDocument();
    });

    it('should default to the Detallado (advanced) view', () => {
        render(<App />);
        expect(screen.getByText('Desglose por País')).toBeInTheDocument();
    });

    it('should switch to SimpleCalculator when clicking "Rápido"', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Rápido'));
        expect(screen.getByText('Calculadora Rápida')).toBeInTheDocument();
    });

    it('should switch to GoalCalculator when clicking "Metas"', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Metas'));
        expect(screen.getByText('¿Cuánto quieres ganar?')).toBeInTheDocument();
    });

    it('should switch back to AdvancedCalculator when clicking "Detallado"', () => {
        render(<App />);
        // Switch away first
        fireEvent.click(screen.getByText('Rápido'));
        expect(screen.getByText('Calculadora Rápida')).toBeInTheDocument();
        // Switch back
        fireEvent.click(screen.getByText('Detallado'));
        expect(screen.getByText('Desglose por País')).toBeInTheDocument();
    });
});
