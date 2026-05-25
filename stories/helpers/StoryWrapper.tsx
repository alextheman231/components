import type { StoryContext } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { VersionNumber } from "@alextheman/utility";

import { Page } from "src/root";
import { ThemeProvider } from "src/theme";
import ThemeToggle from "src/theme/ThemeToggle";

import { name as packageName, version } from "package.json" with { type: "json" };

interface StoryWrapperProps {
  Story: () => ReactNode;
  context: StoryContext;
}

function StoryWrapper({ Story, context }: StoryWrapperProps) {
  return (
    <ThemeProvider>
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
