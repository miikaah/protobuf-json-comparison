module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-async-promise-executor": "off",
    "prettier/prettier": 1,
  },
};
