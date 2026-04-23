import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["combined/typescript-react"],
  ...alexPlugin.configs["internal/components"],
  {
    rules: {
      "jsdoc/require-jsdoc": "off",
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
];
