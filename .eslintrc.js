module.exports = {
  root: true,
  extends: ['airbnb', "universe/native"],
  env: {
    browser: true,
    es2021: true,
  },
  //extends: 'airbnb',
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
<<<<<<< HEAD
    'no-undef': 'warn', // Change 'error' to 'warn'
=======
    'indent' : 'off',
    'prettier/prettier': 'off',
>>>>>>> a6bd026c7cf5bfa3af7f3f01c23466f24f37a267
  },
};
