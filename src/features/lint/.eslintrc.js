"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  plugins: [
    "eslint-plugin-pwa-lint"
  ],
  env: {
    node: true,
  },
  rules: {
    "eslint-plugin-pwa-lint/registration": {},
    "eslint-plugin-pwa-lint/activation": {},
    "eslint-plugin-pwa-lint/installation": {}
  }
};
