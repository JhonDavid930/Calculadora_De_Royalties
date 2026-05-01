import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./ui/RevenueDistributionChart', () => ({
    default: ({ totalRevenue }: { totalRevenue: number }) => (
        <div>
            <h3>Distribución de Ingresos</h3>
            {totalRevenue > 0 ? (
                <p>Chart ready</p>
            ) : (
                <>
                    <p>Ingresa streams</p>
                    <p>La gráfica se actualizará al ingresar datos.</p>
                </>
            )}
        </div>
    ),
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

import AdvancedCalculator from './AdvancedCalculator';

describe('AdvancedCalculator', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should render the 3 stat boxes', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Ingresos Estimados')).toBeInTheDocument();
        expect(screen.getByText('Total Streams')).toBeInTheDocument();
        expect(screen.getByText('RPM Efectivo')).toBeInTheDocument();
    });

    it('should render "Desglose por País" heading', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Desglose por País')).toBeInTheDocument();
    });

    it('should render Limpiar and Selector Masivo buttons', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Limpiar')).toBeInTheDocument();
        expect(screen.getByText('Selector Masivo')).toBeInTheDocument();
    });

    it('should render the "Agregar fila vacía" button', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Agregar fila vacía')).toBeInTheDocument();
    });

    it('should add a new row when clicking "Agregar fila vacía"', () => {
        render(<AdvancedCalculator />);
        const addButton = screen.getByText('Agregar fila vacía');
        const selects = screen.getAllByText('Selecciona un país...');
        const initialCount = selects.length;

        fireEvent.click(addButton);

        const newSelects = screen.getAllByText('Selecciona un país...');
        expect(newSelects.length).toBe(initialCount + 1);
    });

    it('should display $0.00 initial revenue', () => {
        render(<AdvancedCalculator />);
        // Both "Ingresos Estimados" and "RPM Efectivo" show $0.00
        const zeroValues = screen.getAllByText('$0.00');
        expect(zeroValues.length).toBeGreaterThanOrEqual(2);
    });

    it('should render "Distribución de Ingresos" chart section', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Distribución de Ingresos')).toBeInTheDocument();
    });

    it('should show chart placeholder text when no data', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText('Ingresa streams')).toBeInTheDocument();
        expect(screen.getByText('La gráfica se actualizará al ingresar datos.')).toBeInTheDocument();
    });

    it('should render the tip text', () => {
        render(<AdvancedCalculator />);
        expect(screen.getByText(/Usa el "Selector Masivo" para agregar/)).toBeInTheDocument();
    });
});
