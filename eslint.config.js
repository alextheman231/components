// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["combined/typescript-react"],
  ...alexPlugin.configs["internal/components"],
  ...alexPlugin.configs["general/package-json"],
  ...storybook.configs["flat/recommended"],
];
