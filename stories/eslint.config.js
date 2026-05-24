import storybook from "eslint-plugin-storybook";

import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["combined/typescript-react"],
  ...alexPlugin.configs["internal/components"],
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "jsdoc/require-jsdoc": "off",
      "n/no-unsupported-features/node-builtins": "off",
      "@eslint-react/rules-of-hooks": "off", // Gives false positives when used in render.
    },
  },
];
