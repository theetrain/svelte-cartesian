import eslintPluginSvelte from 'eslint-plugin-svelte'
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat()

export default [
  // standard compatibility
  ...compat.extends('eslint-config-standard'),
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    rules: {
      'no-multi-str': 0,
      'operator-linebreak': ['error', 'before']
    }
  }
]
