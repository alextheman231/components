import type { Meta, StoryObj } from "@storybook/react-vite";

import { DropdownMenuItem, ExternalLink } from "src";
import { fn, screen } from "storybook/test";
import { Route } from "wouter";

import { DropdownMenuProvider, InternalLink, MemoryRouter, Switch } from "src/v7";
import DropdownMenuWrapper from "src/v7/components/DropdownMenu/DropdownMenuWrapper";

const meta: Meta = {
  component: DropdownMenuProvider,
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
      <Switch>
        <Route path="/">
          <DropdownMenuWrapper>
            <DropdownMenuItem component={InternalLink} to={to}>
              Item that internally navigates
            </DropdownMenuItem>
            <DropdownMenuItem component={ExternalLink} href={href}>
              Item that externally navigates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClick}>
              Item that runs an onClick function
            </DropdownMenuItem>
          </DropdownMenuWrapper>
        </Route>
        <Route path="/test">
          <InternalLink to="/">Return to DropdownMenu</InternalLink>
        </Route>
      </Switch>
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
  play: async ({ userEvent, canvas }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(button);
    const internalLinkItem = await screen.findByRole("menuitem", {
      name: "Item that internally navigates",
    });
    await userEvent.click(internalLinkItem);
    await canvas.findByRole("link", { name: "Return to DropdownMenu" });
  },
};
