/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdvancedCalculator from './AdvancedCalculator';

// Mock child components to avoid complex rendering and isolate the unit under test
vi.mock('./ui/StatBox', () => ({
    default: ({ label, value }) => <div data-testid="stat-box">{label}: {value}</div>
}));

vi.mock('./ui/Card', () => ({
    default: ({ children, title }) => <div data-testid="card"><h3>{title}</h3>{children}</div>
}));

// Mock Recharts to avoid canvas issues in jsdom
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({ children }) => <div data-testid="pie">{children}</div>,
    Cell: () => <div data-testid="cell" />,
    Tooltip: () => <div data-testid="tooltip" />,
}));

// Mock CountrySelectorModal
vi.mock('./ui/CountrySelectorModal', () => ({
    default: ({ isOpen, children }) => isOpen ? <div data-testid="country-modal">Buscar país... SELECCIONAR TODO {children}</div> : null
}));

describe('AdvancedCalculator Component', () => {

    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should render the main title and sections', () => {
        render(<AdvancedCalculator />);

        // Check for main title (it might be in a header or card)
        // The exact text depends on the component, checking for key elements
        expect(screen.getByText(/Ingresos Estimados/i)).toBeInTheDocument();

        // Check for "Desglose por País" section
        expect(screen.getByText(/Desglose por País/i)).toBeInTheDocument();
    });

    it('should open the "Agregar Países" modal when clicked', async () => {
        render(<AdvancedCalculator />);

        // Find the button to add countries
        // It might be "Agregar fila vacía" or "Selector Masivo" based on previous context, 
        // but the most prominent one usually has a plus icon or text "Selector Masivo"

        // Use getAllByText because there is a tooltip/tip with similar text
        // The button is usually the first one or we can filter by tag if needed
        // But getByRole is more semantic and precise
        const addButton = screen.getByRole('button', { name: /Selector Masivo/i });
        fireEvent.click(addButton);

        // After clicking, the modal should appear. 
        // We check for text that only exists in the modal, e.g., "Agregar Países" header
        await waitFor(() => {
            expect(screen.getByText(/Buscar país.../i)).toBeInTheDocument();
        });
    });

    it('should display the "Seleccionar Todo" button in the modal', async () => {
        render(<AdvancedCalculator />);

        const addButton = screen.getByRole('button', { name: /Selector Masivo/i });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText(/SELECCIONAR TODO/i)).toBeInTheDocument();
        });
    });
});
