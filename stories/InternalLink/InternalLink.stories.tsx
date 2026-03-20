import type { Meta, StoryObj } from "@storybook/react-vite";

import { InternalLink } from "src";
import InternalLinkMain from "stories/InternalLink/demos/InternalLinkMain";

const meta: Meta<typeof InternalLink> = {
  component: InternalLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: (props) => {
    return <InternalLinkMain {...props} />;
  },
  args: {
    to: "/test",
    children: "Navigate",
  },
};
