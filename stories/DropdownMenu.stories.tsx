import type { Meta, StoryObj } from "@storybook/react-vite";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DropdownMenuItem, ExternalLink, InternalLink } from "src";
import { fn } from "storybook/test";

import { DropdownMenu } from "src/v7";

const meta: Meta = {
  title: "DropdownMenu",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
  render: ({ to, href, onClick }) => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <DropdownMenu buttonProps={{ children: "Menu" }}>
              <DropdownMenuItem component={InternalLink} to={to}>
                Item that internally navigates
              </DropdownMenuItem>
              <DropdownMenuItem component={ExternalLink} href={href}>
                Item that externally navigates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClick}>
                Item that runs an onClick function
              </DropdownMenuItem>
            </DropdownMenu>
          }
        />
        <Route path="/test" element={<InternalLink to="/">Return to DropdownMenu</InternalLink>} />
      </Routes>
    );
  },
  args: {
    to: "/test",
    href: "https://alextheman231.github.io/components/",
    onClick: fn(),
  },
  argTypes: {
    to: {
      description: "Where the DropdownMenuItem with component InternalLink should navigate to.",
    },
    href: {
      description: "Where the DropdownMenuItem with component ExternalLink should navigate to.",
    },
    onClick: {
      description: "The function to run after clicking the DropdownMenuItem with onClick.",
    },
  },
};
