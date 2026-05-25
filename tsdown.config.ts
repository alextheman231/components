import type { UserConfig } from "tsdown";

const baseConfig: UserConfig = {
  format: ["esm"],
  dts: true,
  deps: {
    neverBundle: ["react"],
  },
  clean: true,
  minify: true,
  sourcemap: true,
  fixedExtension: false,
};

const config: Array<UserConfig> = [
  {
    entry: ["src/audio/index.ts"],
    outDir: "dist/audio",
  },
  {
    entry: ["src/DropdownMenu/index.ts"],
    outDir: "dist/DropdownMenu",
  },
  {
    entry: ["src/form/index.ts"],
    outDir: "dist/form",
  },
  {
    entry: ["src/QueryBoundary/index.ts"],
    outDir: "dist/QueryBoundary",
  },
  {
    entry: ["src/root/index.ts"],
    outDir: "dist",
  },
  {
    entry: ["src/routing/index.ts"],
    outDir: "dist/routing",
  },
  {
    entry: ["src/snackbar/index.ts"],
    outDir: "dist/snackbar",
  },
  {
    entry: ["src/Tab/index.ts"],
    outDir: "dist/Tab",
  },
  {
    entry: ["src/theme/index.ts"],
    outDir: "dist/theme",
  },
].map(({ entry, outDir }) => {
  return {
    entry,
    outDir,
    ...baseConfig,
  };
});

export default config;
