import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SimpleCalculator from './SimpleCalculator';

describe('SimpleCalculator', () => {
    it('should render the title', () => {
        render(<SimpleCalculator />);
        expect(screen.getByText('Calculadora Rápida')).toBeInTheDocument();
    });

    it('should render streams input with default value', () => {
        render(<SimpleCalculator />);
        const input = screen.getByDisplayValue('100000');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'number');
    });

    it('should render rate slider', () => {
        render(<SimpleCalculator />);
        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
    });

    it('should display estimated revenue on initial render', () => {
        render(<SimpleCalculator />);
        // Default: 100000 * 0.003 = $300.00
        expect(screen.getByText('$300.00')).toBeInTheDocument();
    });

    it('should update revenue when streams change', () => {
        render(<SimpleCalculator />);
        const input = screen.getByDisplayValue('100000');
        fireEvent.change(input, { target: { value: '200000' } });
        // 200000 * 0.003 = $600.00
        expect(screen.getByText('$600.00')).toBeInTheDocument();
    });

    it('should show range labels', () => {
        render(<SimpleCalculator />);
        expect(screen.getByText('$0.001 (Bajo)')).toBeInTheDocument();
        expect(screen.getByText('$0.004 (Tier 1)')).toBeInTheDocument();
        expect(screen.getByText('$0.008 (Muy Alto)')).toBeInTheDocument();
    });
});
