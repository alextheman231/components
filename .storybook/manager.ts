import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import { VersionNumber } from "@alextheman/utility";
import packageInfo from "../package.json" with { type: "json" };

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: `${packageInfo.name} • ${new VersionNumber(packageInfo.version)}`,
    brandUrl: "/",
    brandTarget: "_self",
  }),
});
