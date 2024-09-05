module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', '@vue/typescript/recommended'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0, // * Disabled to remove warning about inertiajs's Link component.
    'vue/no-mutating-props': 1, // Changes hard error to warning
    'vue/no-v-html': 0, // Not exactly relevant to our app
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
}
