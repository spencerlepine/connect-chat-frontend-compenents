module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/index.js'],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      lines: 60
    }
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/?!(.*)'],
  testTimeout: 15000
};
