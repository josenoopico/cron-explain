/** @type {import('jest').Config} */
module.exports = {
  // Usar ts-jest para transformar arquivos TypeScript
  preset: 'ts-jest',

  // Ambiente de teste
  testEnvironment: 'node',

  // Padrões para encontrar arquivos de teste
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],

  // Extensões de arquivo que o Jest deve processar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Transformações de arquivo
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },

  // Configuração de cobertura
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],

  // Diretório de saída para relatórios de cobertura
  coverageDirectory: 'coverage',

  // Formato dos relatórios de cobertura
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Limites de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Configurações adicionais do ts-jest
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },

  // Limpar mocks automaticamente entre testes
  clearMocks: true,

  // Restaurar mocks automaticamente entre testes
  restoreMocks: true
};
