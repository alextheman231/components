import type { Meta, StoryObj } from "@storybook/react-vite";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { InternalLink } from "src";
import { expect } from "storybook/test";

const meta: Meta<typeof InternalLink> = {
  component: InternalLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: ({ to, children, ...props }) => {
    return (
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <InternalLink to={to} {...props}>
                {children}
              </InternalLink>
            }
          />
          <Route path="/test" element={<InternalLink to="/">Return to root route</InternalLink>} />
          <Route
            path="/patch-it-up"
            element={
              <>
                You have chosen to face the workflow of the damned! Enter if you dare, or
                <InternalLink to="/">return to safety</InternalLink>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );
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
