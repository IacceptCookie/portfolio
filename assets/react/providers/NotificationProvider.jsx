import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        const notification = { id, message, type };

        setNotifications(prev => [...prev, notification]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const notify = {
        success: (message) => addNotification(message, 'success'),
        error: (message) => addNotification(message, 'error'),
        warning: (message) => addNotification(message, 'warning'),
        info: (message) => addNotification(message, 'info'),
    };

    return (
        <NotificationContext.Provider value={{ notify, removeNotification }}>
            {children}
            <NotificationContainer notifications={notifications} onRemove={removeNotification} />
        </NotificationContext.Provider>
    );
};

const NotificationContainer = ({ notifications, onRemove }) => {
    if (notifications.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px',
        }}>
            {notifications.map(notification => (
                <Toast
                    key={notification.id}
                    notification={notification}
                    onClose={() => onRemove(notification.id)}
                />
            ))}
        </div>
    );
};

const Toast = ({ notification, onClose }) => {
    const { type, message } = notification;

    const styles = {
        base: {
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out',
            fontSize: '14px',
            fontWeight: '500',
        },
        success: {
            backgroundColor: '#10b981',
            color: '#ffffff',
        },
        error: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
        },
        warning: {
            backgroundColor: '#f59e0b',
            color: '#ffffff',
        },
        info: {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
        },
    };

    return (
        <>
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>
            <div style={{ ...styles.base, ...styles[type] }}>
                <span>{message}</span>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '0',
                        lineHeight: '1',
                        opacity: '0.8',
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                >
                    ×
                </button>
            </div>
        </>
    );
};
