import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
    it('should render children', () => {
        render(<Card>Hello World</Card>);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should apply default styling classes', () => {
        const { container } = render(<Card>Content</Card>);
        const div = container.firstChild as HTMLElement;
        expect(div.className).toContain('bg-dark-surface');
        expect(div.className).toContain('rounded-lg');
        expect(div.className).toContain('border');
    });

    it('should merge custom className', () => {
        const { container } = render(<Card className="p-8 custom-test">Content</Card>);
        const div = container.firstChild as HTMLElement;
        expect(div.className).toContain('p-8');
        expect(div.className).toContain('custom-test');
        expect(div.className).toContain('bg-dark-surface');
    });

    it('should render complex children', () => {
        render(
            <Card>
                <h1>Title</h1>
                <p>Description</p>
            </Card>
        );
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
    });
});
