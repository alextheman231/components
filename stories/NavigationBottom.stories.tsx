import type { Meta, StoryObj } from "@storybook/react-vite";

import { MdArrowRight, MdHome } from "react-icons/md";
import { expect } from "storybook/test";
import { Route } from "wouter";

import { InternalLink, MemoryRouter, NavigationBottom, Switch } from "src/v7";

const meta: Meta<typeof NavigationBottom> = {
  component: NavigationBottom,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    function NestedRouter() {
      return (
        <Switch>
          <Route path="/second">
            This is the nested second page{" "}
            <InternalLink to="/third">with a secret link</InternalLink>
          </Route>
        </Switch>
      );
    }

    return (
      <MemoryRouter>
        <NavigationBottom
          navItems={[
            {
              label: "First",
              icon: <MdHome />,
              to: "/first",
            },
            {
              label: "Second",
              icon: <MdArrowRight />,
              to: "/nested/second",
            },
          ]}
        >
          <Route path="/first">This is the first page</Route>
          <Route path="/nested" nest>
            <NestedRouter />
          </Route>
          <Route path="/third">This is the third page</Route>
        </NavigationBottom>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const firstPageLink = canvas.getByText("First");
    expect(firstPageLink.className).not.toContain("Mui-selected");
    await userEvent.click(firstPageLink);
    await canvas.findByText("This is the first page");
    expect(canvas.getByText("First").className).toContain("Mui-selected");

    const secondPageLink = canvas.getByText("Second");
    expect(secondPageLink.className).not.toContain("Mui-selected");
    await userEvent.click(secondPageLink);
    await canvas.findByText("This is the nested second page");
    expect(canvas.getByText("Second").className).toContain("Mui-selected");

    const thirdPageLink = canvas.getByRole("link", { name: "with a secret link" });
    await userEvent.click(thirdPageLink);
    await canvas.findByText("This is the third page");
    expect(canvas.getByText("First").className).not.toContain("Mui-selected");
    expect(canvas.getByText("Second").className).not.toContain("Mui-selected");
  },
};
