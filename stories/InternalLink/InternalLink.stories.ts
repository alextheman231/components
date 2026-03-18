import type { Meta, StoryObj } from "@storybook/react-vite";

import InternalLinkMain from "stories/InternalLink/demos/InternalLinkMain";

const meta: Meta<typeof InternalLinkMain> = {
  component: InternalLinkMain,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    to: "/test",
    children: "Navigate",
  },
};
