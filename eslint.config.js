import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

const tsEslintRecommendedRules =
  tsPlugin.configs['eslint-recommended']?.overrides?.[0]?.rules ?? {}

const tsRecommendedRules = {
  ...tsEslintRecommendedRules,
  ...tsPlugin.configs.recommended.rules,
}

const baseLanguageOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  globals: globals.browser,
}

const basePlugins = {
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
}

const baseRules = {
  ...js.configs.recommended.rules,
  ...reactHooks.configs['recommended-latest'].rules,
  ...reactRefresh.configs.vite.rules,
}

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: baseLanguageOptions,
    plugins: basePlugins,
    rules: baseRules,
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      ...baseLanguageOptions,
      parser: tsParser,
    },
    plugins: {
      ...basePlugins,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...baseRules,
      ...tsRecommendedRules,
    },
  },
]
