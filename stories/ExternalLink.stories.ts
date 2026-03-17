import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExternalLink } from "src/components";

const meta: Meta<typeof ExternalLink> = {
  component: ExternalLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExternalLinkStory: Story = {
  args: {
    href: "https://www.youtube.com/watch?v=mH-Sg-8EnxM",
    children: "Listen to my new album single",
  },
};
