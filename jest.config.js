module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/assets'],
    testMatch: [
        '**/__tests__/**/*.{js,jsx}',
        '**/*.{spec,test}.{js,jsx}'
    ],
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
            ],
        }],
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg|webm)$': '<rootDir>/tests/mocks/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    collectCoverageFrom: [
        'assets/react/**/*.{js,jsx}',
        '!assets/react/main.jsx',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleDirectories: ['node_modules', 'assets'],
};
