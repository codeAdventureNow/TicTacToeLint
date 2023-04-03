module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'comma-dangle': 0,
    'jsx-quotes': 0,
    'react/jsx-one-expression-per-line': 0,
    'operator-linebreak': 0,
    'no-plusplus': 0,
  },
};
