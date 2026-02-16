import { DataError, getDependenciesFromGroup, normaliseIndents } from "@alextheman/utility";
import {
  getPackageJsonContents,
  getPackageJsonPath,
  setupPackageEndToEnd,
} from "@alextheman/utility/internal";
import { expect, test } from "@playwright/test";
import { temporaryDirectoryTask } from "tempy";

import { writeFile } from "node:fs/promises";
import path from "node:path";

import componentsPackageInfo from "package.json" with { type: "json" };

function packageJsonNotFoundError(packagePath: string) {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in temporary directory.",
  );
}

test.describe("Artwork", () => {
  test("Can access and render the exported artwork", async ({ page }) => {
    await temporaryDirectoryTask(async (temporaryPath) => {
      const runCommandInTempDirectory = await setupPackageEndToEnd(temporaryPath, "pnpm", "module");

      const {
        react: reactVersionComponents,
        "react-dom": reactDomVersionComponents,
        "@mui/material": materialUiVersionComponents,
        "@mui/icons-material": materialUiIconsVersionComponents,
        "@emotion/styled": emotionStyledVersionComponents,
        "@emotion/react": emotionReactVersionComponents,
      } = getDependenciesFromGroup(componentsPackageInfo, "devDependencies"); // These are devDependencies and peerDependencies in this package, not regular dependencies.
      await runCommandInTempDirectory`pnpm install react@${reactVersionComponents} react-dom@${reactDomVersionComponents} @mui/material@${materialUiVersionComponents} @mui/icons-material@${materialUiIconsVersionComponents} @emotion/styled@${emotionStyledVersionComponents} @emotion/react@${emotionReactVersionComponents}`;

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

      tempPackageInfo.scripts = {
        ...(tempPackageInfo.scripts ?? {}),
        build: "esbuild Artwork.tsx --bundle --format=esm --jsx=automatic --outfile=index.js",
      };

      await writeFile(getPackageJsonPath(temporaryPath), JSON.stringify(tempPackageInfo, null, 2));

      await writeFile(
        path.join(temporaryPath, "Artwork.tsx"),
        normaliseIndents`
          import { Artwork } from "@alextheman/components";
          import { createRoot } from "react-dom/client";
  
          createRoot(document.getElementById("root")!).render(
              <div data-testid="artwork" style={{ display: "inline-block" }}>
                <Artwork />
              </div>
          );
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
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `,
        { waitUntil: "domcontentloaded" },
      );

      page.on("pageerror", (error) => {
        throw error;
      });
      page.on("console", (message) => {
        if (message.type() === "error") {
          throw new DataError({ message }, "TEST_FAILED", message.text());
        }
      });

      await page.addScriptTag({
        path: path.join(temporaryPath, "index.js"),
        type: "module",
      });

      const artwork = page.getByTestId("artwork");
      await expect(artwork).toBeVisible();
      await expect(artwork.getByText("An Interface For You And I")).toBeVisible();
      await expect(artwork).toHaveScreenshot("artwork.png", { animations: "disabled" });
    });
  });
});
