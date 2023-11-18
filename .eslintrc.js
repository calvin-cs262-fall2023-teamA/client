module.exports = {
  root: true,
  extends: ['airbnb', "universe/native"],
  env: {
    browser: true,
    es2021: true,
  },
  // extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'warn', // Change 'error' to 'warn'
    'indent' : 'off',
    'prettier/prettier': 'off',
    'react/function-component-definition': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
    'global-require': 'off',
    'prefer-template': 'off',
    'import/order': 'off', // wants imports in alphabetical order...
    "react/prop-types": ['error', { 'ignore': ['navigation', 'route'] }] 
    /* react/prop-types: I assume we are using react navigation fine, eslint just flags everything. 
    I'd rather not define prop-type for every instance of react navigation being used */
  },
};
