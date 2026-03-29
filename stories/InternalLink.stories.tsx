import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InternalLinkProps } from "src";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useRef } from "react";
import { expect } from "storybook/test";
import { Route, Switch } from "wouter";

import { InternalLink, MemoryRouter } from "src/v7";

const meta: Meta<typeof InternalLink> = {
  component: InternalLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: ({ to, children, ...props }) => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <InternalLink to={to} {...props}>
              {children}
            </InternalLink>
          </Route>
          <Route path="/test">
            <InternalLink to="/">Return to root route</InternalLink>
          </Route>
          <Route path="/patch-it-up">
            You have chosen to face the workflow of the damned! Enter if you dare, or
            <InternalLink to="/">return to safety</InternalLink>
          </Route>
        </Switch>
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

export const RefForwarding: Story = {
  render: () => {
    const ref = useRef<HTMLAnchorElement>(null);

    return (
      <MemoryRouter>
        <InternalLink to="/test" ref={ref}>
          Navigate
        </InternalLink>

        <button
          onClick={() => {
            ref.current?.focus();
          }}
        >
          Focus Link
        </button>
      </MemoryRouter>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Focus Link" });
    const link = canvas.getByRole("link", { name: "Navigate" });

    await userEvent.click(button);

    await expect(link).toHaveFocus();
  },
};

export const RefForwardingWithComponentProp: Story = {
  render: () => {
    function CustomLink({ ref, to, children, ...props }: InternalLinkProps) {
      return (
        <a ref={ref} href={to} {...props}>
          {children}
        </a>
      );
    }

    const ref = useRef<HTMLAnchorElement>(null);

    return (
      <MemoryRouter>
        <InternalLink to="/test" component={CustomLink} ref={ref}>
          Navigate
        </InternalLink>

        <button
          onClick={() => {
            return ref.current?.focus();
          }}
        >
          Focus Link
        </button>
      </MemoryRouter>
    );
  },
  parameters: {
    tags: ["!autodocs"],
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Focus Link" });
    const link = canvas.getByRole("link", { name: "Navigate" });

    await userEvent.click(button);

    await expect(link).toHaveFocus();
  },
};

export const MaterialUIComponentPropIntegration: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <List>
              <ListItemButton component={InternalLink} to="/test">
                Navigate
              </ListItemButton>
            </List>
          </Route>
          <Route path="/test">
            <InternalLink to="/">Return to root route</InternalLink>
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "Navigate" });
    await userEvent.tab();
    await userEvent.tab();

    await expect(link).toHaveFocus();
    expect(link).toHaveAttribute("tabindex", "0");
  },
};
