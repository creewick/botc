import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]}  */
export default [
  {files: ['src/**/*.{js,mjs,cjs,ts}']},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': ['error', 'never'], 
      'quotes': ['error', 'single'],
      'max-len': ['error', {code: 80}],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }]
    }
  }
]