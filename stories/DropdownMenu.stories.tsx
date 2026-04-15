import type { Meta, StoryObj } from "@storybook/react-vite";

import { useState } from "react";
import { DropdownMenuItem, ExternalLink } from "src";
import { expect, fn, screen } from "storybook/test";
import { Route } from "wouter";

import {
  DropdownMenu,
  DropdownMenuProvider,
  DropdownMenuTrigger,
  InternalLink,
  MemoryRouter,
  Switch,
} from "src/v7";
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

export const Provider: Story = {
  render: ({ onClick }) => {
    return (
      <DropdownMenuProvider>
        <DropdownMenuTrigger>Toggle Dropdown Menu</DropdownMenuTrigger>
        <DropdownMenu>
          <DropdownMenuItem onClick={onClick}>An item in the dropdown</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuProvider>
    );
  },
  args: {
    onClick: fn(),
  },
  play: async ({ args, userEvent, canvas }) => {
    const button = canvas.getByRole("button", { name: "Toggle Dropdown Menu" });
    await userEvent.click(button);
    const item = await screen.findByRole("menuitem", { name: "An item in the dropdown" });
    await userEvent.click(item);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const DefaultPrevention: Story = {
  render: () => {
    const [count, setCount] = useState<number>(0);
    return (
      <>
        <DropdownMenuWrapper>
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              setCount((previous) => {
                return previous + 1;
              });
            }}
          >
            An item in the dropdown
          </DropdownMenuItem>
        </DropdownMenuWrapper>
        The persistent DropdownMenu item has been clicked {count} time{count === 1 ? "" : "s"}
      </>
    );
  },
  play: async ({ userEvent, canvas }) => {
    expect(
      canvas.getByText("The persistent DropdownMenu item has been clicked 0 times"),
    ).toBeInTheDocument();

    const button = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(button);

    const item = await screen.findByRole("menuitem", { name: "An item in the dropdown" });
    await userEvent.click(item);
    await canvas.findByText("The persistent DropdownMenu item has been clicked 1 time");

    await userEvent.click(item);
    await canvas.findByText("The persistent DropdownMenu item has been clicked 2 times");
  },
};
