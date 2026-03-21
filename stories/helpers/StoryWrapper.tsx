import type { StoryContext } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { VersionNumber } from "@alextheman/utility";
import { DarkModeToggle, ModeProvider, Page } from "src";

import { name as packageName, version } from "package.json" with { type: "json" };

interface StoryWrapperProps {
  Story: () => ReactNode;
  context: StoryContext;
}

function StoryWrapper({ Story, context }: StoryWrapperProps) {
  return (
    <ModeProvider>
      <Page
        title={`${context.title} / ${context.name}`}
        subtitle={`${packageName} • ${new VersionNumber(version)}`}
        action={<DarkModeToggle />}
      >
        <Story />
      </Page>
    </ModeProvider>
  );
}

export default StoryWrapper;
