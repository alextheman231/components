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
    entry: ["src/root/index.ts"],
    outDir: "dist",
  },
  {
    entry: ["src/QueryBoundary/index.ts"],
    outDir: "dist/QueryBoundary",
  },
  {
    entry: ["src/Tabs/index.ts"],
    outDir: "dist/Tabs",
  },
].map(({ entry, outDir }) => {
  return {
    entry,
    outDir,
    ...baseConfig,
  };
});

export default config;
