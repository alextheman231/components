import type { StoryContext } from "@storybook/react-vite";
import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { DarkModeToggle, ModeProvider } from "src";

interface StoryWrapperProps {
  Story: () => ReactNode;
  context: StoryContext;
}

function StoryWrapper({ Story, context }: StoryWrapperProps) {
  return (
    <ModeProvider>
      <Card>
        <CardHeader title={`${context.title} Demo`} action={<DarkModeToggle />} />
        <Divider />
        <CardContent>
          <Story />
        </CardContent>
      </Card>
    </ModeProvider>
  );
}

export default StoryWrapper;
