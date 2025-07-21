module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    '!lib/**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}