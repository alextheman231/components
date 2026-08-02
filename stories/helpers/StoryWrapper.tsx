import type { StoryContext } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { VersionNumber } from "@alextheman/utility";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Page } from "src/root";
import { defaultThemeOptions, ThemeToggle } from "src/v8/theme";

import { name as packageName, version } from "package.json" with { type: "json" };

interface StoryWrapperProps {
  Story: () => ReactNode;
  context: StoryContext;
}

function StoryWrapper({ Story, context }: StoryWrapperProps) {
  const theme = createTheme(defaultThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Page
        title={`${context.title} / ${context.name}`}
        subtitle={`${packageName} • ${new VersionNumber(version)}`}
        action={<ThemeToggle />}
      >
        <Story />
      </Page>
    </ThemeProvider>
  );
}

export default StoryWrapper;
