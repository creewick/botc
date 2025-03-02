import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'semi': ['error', 'never'], 
      'quotes': ['error', 'single'],
      'max-len': ['error', {code: 120}],
      '@typescript-eslint/no-unused-vars': [
        'error', 
        { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', }
      ],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }]
    }
  }
]