import type { CreateEnumType } from "@alextheman/utility";

import { parseZodSchema } from "@alextheman/utility";
import z from "zod";

export const DependencyGroup = {
  DEPENDENCIES: "dependencies",
  DEV_DEPENDENCIES: "devDependencies",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DependencyGroup = CreateEnumType<typeof DependencyGroup>;

// eslint-disable-next-line jsdoc/require-jsdoc
function getDependenciesFromGroup(
  packageInfo: Record<string, unknown>,
  dependencyGroup: DependencyGroup,
): Record<string, string> {
  return {
    dependencies: parseZodSchema(z.record(z.string(), z.string()), packageInfo.dependencies ?? {}),
    devDependencies: parseZodSchema(
      z.record(z.string(), z.string()),
      packageInfo.devDependencies ?? {},
    ),
  }[dependencyGroup];
}

export default getDependenciesFromGroup;
