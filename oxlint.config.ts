import { oxlintConfigBase } from "@alextheman/configs/oxlint";
import { assertNotUndefined } from "@alextheman/utility";
import type { OxlintConfig } from "oxlint";

const baseConfig = oxlintConfigBase();
assertNotUndefined(baseConfig.plugins);

const config: OxlintConfig = {
  extends: [baseConfig],
  plugins: [...baseConfig.plugins, "react", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};

export default config;
