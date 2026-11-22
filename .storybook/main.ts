import type { StorybookConfig } from "@storybook/react-vite";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    // Allow absolute paths to resolve correctly
    config.resolve.alias = {
      // oxlint-disable-next-line typescript/no-misused-spread -- It is not an array.
      ...config.resolve.alias,
      src: path.resolve(__dirname, "..", "src"),
      stories: path.resolve(__dirname, "..", "stories"),
      "package.json": path.resolve(__dirname, "..", "package.json"),
    };

    // Ignore "use client" warnings (not relevant to us as we don't use server components)
    config.build ??= {};
    config.build.rolldownOptions ??= {};
    config.build.rolldownOptions.onLog = (level, log, defaultHandler) => {
      if (log.message?.includes('"use client"')) {
        return;
      }
      defaultHandler(level, log);
    };

    return config;
  },
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest", "@storybook/addon-a11y"],
  docs: {
    docsMode: false,
  },
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
};
export default config;
