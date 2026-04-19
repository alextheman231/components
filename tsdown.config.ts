import type { UserConfig } from "tsdown";

const config: Array<UserConfig> = [
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    deps: {
      neverBundle: ["react"],
    },
    clean: true,
    minify: true,
    sourcemap: true,
    fixedExtension: false,
  },
  {
    entry: ["src/v7/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    deps: {
      neverBundle: ["react"],
    },
    clean: true,
    minify: true,
    sourcemap: true,
    fixedExtension: false,
  },
];

export default config;
