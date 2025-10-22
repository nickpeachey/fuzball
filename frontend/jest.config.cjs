// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  // Only treat files with .test or .spec as tests (even inside __tests__)
  testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Transform ESM modules from msw and its deps
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs\\/interceptors|until-async)/)'
  ],
}

module.exports = createJestConfig(customJestConfig)
