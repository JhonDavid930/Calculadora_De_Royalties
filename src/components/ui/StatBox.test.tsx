import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { LucideIcon } from 'lucide-react';
import StatBox from './StatBox';

// Mock lucide-react icon — cast to LucideIcon for type safety
const MockIcon = vi.fn((props: Record<string, unknown>) => <svg data-testid="mock-icon" {...props} />) as unknown as LucideIcon;

describe('StatBox', () => {
    it('should render label and value', () => {
        render(<StatBox label="Total Revenue" value="$500.00" />);
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('$500.00')).toBeInTheDocument();
    });

    it('should render subtext when provided', () => {
        render(<StatBox label="RPM" value="$3.50" subtext="Per 1000 streams" />);
        expect(screen.getByText('Per 1000 streams')).toBeInTheDocument();
    });

    it('should not render subtext when not provided', () => {
        const { container } = render(<StatBox label="RPM" value="$3.50" />);
        const subtextElements = container.querySelectorAll('.text-xs');
        expect(subtextElements.length).toBe(0);
    });

    it('should render icon when provided', () => {
        render(<StatBox label="Test" value="123" icon={MockIcon} />);
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should apply highlight styling when highlight=true', () => {
        const { container } = render(<StatBox label="Revenue" value="$100" highlight />);
        const valueEl = container.querySelector('h3');
        expect(valueEl?.className).toContain('text-spotify-green');
    });

    it('should apply normal styling when highlight=false', () => {
        const { container } = render(<StatBox label="Revenue" value="$100" />);
        const valueEl = container.querySelector('h3');
        expect(valueEl?.className).toContain('text-text-primary');
    });
});
