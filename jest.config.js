module.exports = {
    "moduleNameMapper": {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/index.js"
    ],
    "testTimeout": 15000,
}