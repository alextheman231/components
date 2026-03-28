import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["combined/typescript-react"],
  ...alexPlugin.configs["internal/components"],
  {
    rules: {
      "@typescript-eslint/no-deprecated": "off",
      "jsdoc/require-jsdoc": "off",
    },
  },
];
