// jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  moduleNameMapper: {
    // mock CSS imports
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // mock static assets
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/types/**",
    "!src/app/**" // optionally exclude app folder server files if you want
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"]
};
