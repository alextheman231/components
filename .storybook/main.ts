import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      src: path.resolve(__dirname, "..", "src"),
      stories: path.resolve(__dirname, "..", "stories"),
    };
    return config;
  },
  addons: ["@storybook/addon-docs"],
  docs: {
    docsMode: false,
  },
  framework: "@storybook/react-vite",
};
export default config;
