import type { UserConfig } from "tsdown";

const baseConfig: UserConfig = {
  clean: true,
  deps: {
    neverBundle: ["react"],
  },
  dts: true,
  fixedExtension: false,
  format: ["esm"],
  minify: true,
  sourcemap: true,
};

const config: Array<UserConfig> = [
  {
    entry: "src/root/index.ts",
    outDir: "dist",
    ...baseConfig,
  },
  {
    entry: [
      "src/audio/index.ts",
      "src/DropdownMenu/index.ts",
      "src/file/index.ts",
      "src/form/index.ts",
      "src/icons/index.ts",
      "src/QueryBoundary/index.ts",
      "src/routing/index.ts",
      "src/snackbar/index.ts",
      "src/Tab/index.ts",
      "src/theme/index.ts",
      "src/v8/theme/index.ts",
    ],
    ...baseConfig,
  },
];

export default config;
