/* eslint-disable no-undef */
import { render, screen, fireEvent, act } from '@testing-library/react';

// Mock the virtual module from vite-plugin-pwa
const mockUpdateServiceWorker = vi.fn();
let mockNeedRefresh = false;

vi.mock('virtual:pwa-register/react', () => ({
    useRegisterSW: (options) => {
        // Simulate calling onRegisteredSW if provided
        if (options?.onRegisteredSW) {
            options.onRegisteredSW('http://localhost/sw.js', { update: vi.fn() });
        }
        return {
            needRefresh: [mockNeedRefresh],
            updateServiceWorker: mockUpdateServiceWorker,
        };
    },
}));

// Must import AFTER mocking
import ReloadPrompt from './ReloadPrompt';

describe('ReloadPrompt Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockNeedRefresh = false;
    });

    it('should NOT render when no update is available', () => {
        mockNeedRefresh = false;
        const { container } = render(<ReloadPrompt />);
        expect(container.innerHTML).toBe('');
    });

    it('should render the update prompt when needRefresh is true', () => {
        mockNeedRefresh = true;
        render(<ReloadPrompt />);

        expect(screen.getByText('Nueva actualización disponible')).toBeInTheDocument();
        expect(screen.getByText(/nueva versión de RoyaltyPro/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Actualizar ahora/i })).toBeInTheDocument();
    });

    it('should call updateServiceWorker(true) when "Actualizar ahora" is clicked', () => {
        mockNeedRefresh = true;
        render(<ReloadPrompt />);

        const updateButton = screen.getByRole('button', { name: /Actualizar ahora/i });
        fireEvent.click(updateButton);

        expect(mockUpdateServiceWorker).toHaveBeenCalledWith(true);
    });

    it('should temporarily dismiss the prompt when the close button is clicked', () => {
        mockNeedRefresh = true;
        render(<ReloadPrompt />);

        // Prompt should be visible
        expect(screen.getByText('Nueva actualización disponible')).toBeInTheDocument();

        // Click close
        const closeButton = screen.getByRole('button', { name: /Cerrar notificación/i });
        fireEvent.click(closeButton);

        // Prompt should be hidden (dismissed)
        expect(screen.queryByText('Nueva actualización disponible')).not.toBeInTheDocument();
    });

    it('should re-show the prompt after dismiss when app gains focus', () => {
        mockNeedRefresh = true;
        render(<ReloadPrompt />);

        // Dismiss the prompt
        const closeButton = screen.getByRole('button', { name: /Cerrar notificación/i });
        fireEvent.click(closeButton);
        expect(screen.queryByText('Nueva actualización disponible')).not.toBeInTheDocument();

        // Simulate user coming back to the app
        act(() => {
            window.dispatchEvent(new Event('focus'));
        });

        // Prompt should reappear because needRefresh is still true
        expect(screen.getByText('Nueva actualización disponible')).toBeInTheDocument();
    });

    it('should register visibility change and focus listeners for update checks', () => {
        const addEventSpy = vi.spyOn(window, 'addEventListener');
        const docAddEventSpy = vi.spyOn(document, 'addEventListener');

        mockNeedRefresh = false;
        render(<ReloadPrompt />);

        expect(addEventSpy).toHaveBeenCalledWith('focus', expect.any(Function));
        expect(docAddEventSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

        addEventSpy.mockRestore();
        docAddEventSpy.mockRestore();
    });
});
