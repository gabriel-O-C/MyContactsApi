module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-promise-executor-return': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
  },
};
