module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'eslint linebreak-style': ['off', 'windows'],
    'no-unused-vars': ['off'],
  },
};
