import '@testing-library/jest-dom';

// Mock sessionStorage
const sessionStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
});

// Mock fetch globally
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
    sessionStorageMock.clear();
    global.fetch.mockClear();
});
