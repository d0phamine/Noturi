import { defineConfig } from 'eslint';
import typescriptPlugin from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default defineConfig({
  ignorePatterns: ['dist'],
  parser: typescriptPlugin,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    globals: {
      ...globalThis,
      ...globalThis.window,
      ...globalThis.document,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended',
  ],
  rules: {
    // Здесь можно добавить свои правила ESLint
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        // Переопределенные правила для TypeScript и React
      },
    },
  ],
});