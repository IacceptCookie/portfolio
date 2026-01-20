import { render, screen, waitFor, act } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationProvider';

// Test component that uses the notification context
const TestComponent = () => {
    const { notify } = useNotification();

    return (
        <div>
            <button onClick={() => notify.success('Success message')}>Success</button>
            <button onClick={() => notify.error('Error message')}>Error</button>
            <button onClick={() => notify.warning('Warning message')}>Warning</button>
            <button onClick={() => notify.info('Info message')}>Info</button>
        </div>
    );
};

describe('NotificationProvider', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should throw error when used outside provider', () => {
        // Suppress console.error for this test
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useNotification must be used within NotificationProvider');

        consoleError.mockRestore();
    });

    it('should render children', () => {
        render(
            <NotificationProvider>
                <div data-testid="test-child">Test</div>
            </NotificationProvider>
        );

        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('should display success notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Success').click();
        });

        expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('should display error notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Error').click();
        });

        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should display warning notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Warning').click();
        });

        expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should display info notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Info').click();
        });

        expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('should display multiple notifications', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Success').click();
            screen.getByText('Error').click();
        });

        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should auto-remove notification after 5 seconds', async () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Success').click();
        });

        expect(screen.getByText('Success message')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        await waitFor(() => {
            expect(screen.queryByText('Success message')).not.toBeInTheDocument();
        });
    });

    it('should allow manual removal of notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            screen.getByText('Success').click();
        });

        expect(screen.getByText('Success message')).toBeInTheDocument();

        const closeButton = screen.getByText('×');
        act(() => {
            closeButton.click();
        });

        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
});
