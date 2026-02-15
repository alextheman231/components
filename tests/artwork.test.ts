import { DataError, normaliseIndents } from "@alextheman/utility";
import { expect, test } from "@playwright/test";
import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import getDependenciesFromGroup from "tests/helpers/getDependenciesFromGroup";
import getExpectedTgzName from "tests/helpers/getExpectedTgzName";
import getPackageJsonContents from "tests/helpers/getPackageJsonContents";
import getPackageJsonPath from "tests/helpers/getPackageJsonPath";

import componentsPackageInfo from "package.json" with { type: "json" };

function packageJsonNotFoundError(packagePath: string) {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in temporary directory.",
  );
}

test("Can access and render the exported artwork", async ({ page }) => {
  await temporaryDirectoryTask(async (temporaryPath) => {
    await execa`pnpm pack --pack-destination ${temporaryPath}`;
    const tgzFileName = await getExpectedTgzName(process.cwd(), "pnpm");
    const runCommandInTempDirectory = execa({ cwd: temporaryPath });

    await runCommandInTempDirectory`pnpm init`;

    const packageInfo = await getPackageJsonContents(temporaryPath);

    if (packageInfo === null) {
      throw packageJsonNotFoundError(temporaryPath);
    }
    packageInfo.type = "module";

    await writeFile(getPackageJsonPath(temporaryPath), JSON.stringify(packageInfo, null, 2));

    const {
      react: reactVersionComponents,
      "react-dom": reactDomVersionComponents,
      "@mui/material": materialUiVersionComponents,
      "@mui/icons-material": materialUiIconsVersionComponents,
      "@emotion/styled": emotionStyledVersionComponents,
      "@emotion/react": emotionReactVersionComponents,
    } = getDependenciesFromGroup(componentsPackageInfo, "devDependencies"); // These are devDependencies and peerDependencies in this package, not regular dependencies.
    await runCommandInTempDirectory`pnpm install file:${path.resolve(temporaryPath, tgzFileName)} react@${reactVersionComponents} react-dom@${reactDomVersionComponents} @mui/material@${materialUiVersionComponents} @mui/icons-material@${materialUiIconsVersionComponents} @emotion/styled@${emotionStyledVersionComponents} @emotion/react@${emotionReactVersionComponents}`;

    const {
      "@types/react": typesReactVersionComponents,
      "@types/react-dom": typesReactDomVersionComponents,
      esbuild: esbuildVersionComponents,
    } = getDependenciesFromGroup(componentsPackageInfo, "devDependencies");
    await runCommandInTempDirectory`pnpm install --save-dev @types/react@${typesReactVersionComponents} @types/react-dom@${typesReactDomVersionComponents} esbuild@${esbuildVersionComponents}`;

    const tempPackageInfo = await getPackageJsonContents(temporaryPath);
    if (tempPackageInfo === null) {
      throw packageJsonNotFoundError(temporaryPath);
    }

    // TODO: Get rid of --alias when the next utility major releases.
    tempPackageInfo.scripts = {
      ...(tempPackageInfo.scripts ?? {}),
      build:
        "esbuild Artwork.tsx --bundle --format=esm --external:node:* --alias:node:path=./patches/node-path.ts --jsx=automatic --outfile=index.js",
    };

    await writeFile(getPackageJsonPath(temporaryPath), JSON.stringify(tempPackageInfo, null, 2));

    await writeFile(
      path.join(temporaryPath, "Artwork.tsx"),
      normaliseIndents`
        import { Artwork } from "@alextheman/components";
        import { createRoot } from "react-dom/client";

        createRoot(document.getElementById("root")!).render(
          <Artwork />
        );
      `,
    );

    // TODO: Get rid of this patch when the next utility major releases.
    const pathPatchPath = path.join(temporaryPath, "patches", "node-path.ts");
    await mkdir(path.dirname(pathPatchPath), { recursive: true });
    await writeFile(
      pathPatchPath,
      normaliseIndents`
        const pathStub = {} as any;
        export default pathStub;
        export const sep = "/";
        export const posix = pathStub;
        export const win32 = pathStub;
      `,
    );

    await runCommandInTempDirectory`pnpm run build`;

    await page.setContent(
      normaliseIndents`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `,
      { waitUntil: "domcontentloaded" },
    );

    await page.addScriptTag({
      path: path.join(temporaryPath, "index.js"),
      type: "module",
    });

    const artwork = page.locator("#root > *").first();
    await expect(artwork).toBeVisible();
    await expect(artwork.getByText("An Interface For You And I")).toBeVisible();
    await expect(artwork).toHaveScreenshot("artwork.png", { animations: "disabled" });
  });
});
