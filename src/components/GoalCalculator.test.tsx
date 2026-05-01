import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GoalCalculator from './GoalCalculator';

describe('GoalCalculator', () => {
    it('should render the main heading', () => {
        render(<GoalCalculator />);
        expect(screen.getByText('¿Cuánto quieres ganar?')).toBeInTheDocument();
    });

    it('should render all audience options', () => {
        render(<GoalCalculator />);
        expect(screen.getByText('Tier 1 (US/UK/EU)')).toBeInTheDocument();
        expect(screen.getAllByText('Tier 3 (LatAm/Mix)').length).toBeGreaterThan(0);
        expect(screen.getByText('Tier 5 (Viral/Free)')).toBeInTheDocument();
    });

    it('should render the goal amount input with default $1000', () => {
        render(<GoalCalculator />);
        const input = screen.getByDisplayValue('1000');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'number');
    });

    it('should calculate streams needed correctly (default: 1000 / 0.0025 = 400,000)', () => {
        render(<GoalCalculator />);
        expect(screen.getByText('400,000')).toBeInTheDocument();
    });

    it('should update calculation when goal amount changes', () => {
        render(<GoalCalculator />);
        const input = screen.getByDisplayValue('1000');
        fireEvent.change(input, { target: { value: '2000' } });
        // 2000 / 0.0025 = 800,000
        expect(screen.getByText('800,000')).toBeInTheDocument();
    });

    it('should update calculation when audience tier changes', () => {
        render(<GoalCalculator />);
        // Click Tier 1 (rate = 0.0040)
        const tier1Button = screen.getByText('Tier 1 (US/UK/EU)');
        fireEvent.click(tier1Button);
        // 1000 / 0.004 = 250,000
        expect(screen.getByText('250,000')).toBeInTheDocument();
    });

    it('should display the growth tip', () => {
        render(<GoalCalculator />);
        expect(screen.getByText(/Tip de crecimiento/)).toBeInTheDocument();
        expect(screen.getByText(/60% más/)).toBeInTheDocument();
        expect(screen.getAllByText(/Tier 3 \(LatAm\/Mix\)/).length).toBeGreaterThan(0);
    });

    it('should adapt the growth tip to the selected audience profile', () => {
        render(<GoalCalculator />);

        fireEvent.click(screen.getByText('Tier 1 (US/UK/EU)'));
        expect(screen.getByText(/rango premium/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText('Tier 5 (Viral/Free)'));
        expect(screen.getByText(/233% más/)).toBeInTheDocument();
    });

    it('should show "Streams Mensuales" label', () => {
        render(<GoalCalculator />);
        expect(screen.getByText('Streams Mensuales')).toBeInTheDocument();
    });
});
