import type { Meta, StoryObj } from "@storybook/react-vite";

import ExternalLinkMain from "stories/ExternalLink/demos/ExternalLinkMain";

const meta: Meta<typeof ExternalLinkMain> = {
  component: ExternalLinkMain,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    href: "https://www.youtube.com/watch?v=mH-Sg-8EnxM",
    children: "Listen to my new album single",
  },
};
