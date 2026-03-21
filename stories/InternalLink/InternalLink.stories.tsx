import type { Meta, StoryObj } from "@storybook/react-vite";

import { InternalLink } from "src";
import InternalLinkMain from "stories/InternalLink/demos/InternalLinkMain";
import { expect } from "storybook/test";

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
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "Navigate" });
    await userEvent.click(link);

    const newLink = canvas.getByRole("link", { name: "Return to root route" });
    await expect(newLink).toBeInTheDocument();
  },
};
