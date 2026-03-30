import type { Meta, StoryObj } from "@storybook/react-vite";

import { UUID_PATTERN } from "@alextheman/utility";
import Stack from "@mui/material/Stack";
import NESTED_ROUTE from "stories/Routing/helpers/constants/NESTED_ROUTE";
import VALID_ROUTE from "stories/Routing/helpers/constants/VALID_ROUTE";
import MainRouteLinks from "stories/Routing/helpers/MainRouteLinks";
import NestedRouter from "stories/Routing/helpers/NestedRouter";
import ValidRouteContents from "stories/Routing/helpers/ValidRouteContents";
import { expect } from "storybook/test";
import { Route } from "wouter";

import { InternalLink, MemoryRouter, Switch } from "src/v7";

const meta: Meta = {
  title: "Routing with Wouter (v7)",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <MainRouteLinks showValid showNestedValid showInvalid showNestedInvalid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
          <Route path={NESTED_ROUTE} nest>
            <NestedRouter />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
};

export const Valid: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <MainRouteLinks showValid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const validLink = canvas.getByRole("link", { name: "Go to a valid route" });
    await userEvent.click(validLink);
    await canvas.findByText("This is a valid route");
    await userEvent.click(canvas.getByRole("link", { name: "Back to main demonstration" }));
    await canvas.findByText("Please choose a link");
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <MainRouteLinks showInvalid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const invalidLink = canvas.getByRole("link", { name: "Go to an invalid route" });
    await userEvent.click(invalidLink);
    await canvas.findByText("Page Not Found");
    await userEvent.click(canvas.getByRole("link", { name: "here" }));
    await canvas.findByText("Please choose a link");
  },
};

export const ValidNested: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <MainRouteLinks showValid showNestedValid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
          <Route path={NESTED_ROUTE} nest>
            <NestedRouter />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const validNestedLink = canvas.getByRole("link", { name: "Go to a valid nested route" });
    await userEvent.click(validNestedLink);
    await canvas.findByText("This is a valid nested route");
    await userEvent.click(canvas.getByRole("link", { name: "Back to main demonstration" }));
    await canvas.findByText("Please choose a link");
  },
};

export const InvalidNested: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <MainRouteLinks showNestedValid showNestedInvalid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
          <Route path={NESTED_ROUTE} nest>
            <NestedRouter />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const validNestedLink = canvas.getByRole("link", { name: "Go to an invalid nested route" });
    await userEvent.click(validNestedLink);
    await canvas.findByText("Page Not Found");
    await userEvent.click(canvas.getByRole("link", { name: "here" }));
    await canvas.findByText("Please choose a link");
  },
};

export const NestedLink: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <InternalLink to="/users">Go to users page</InternalLink>
          </Route>
          <Route path="/users" nest>
            <Switch>
              <Route path="/">
                <InternalLink to="/users/sign-in">Sign in</InternalLink>
              </Route>
              <Route path="/sign-in">This is the sign-in page</Route>
            </Switch>
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    await userEvent.click(canvas.getByRole("link", { name: "Go to users page" }));
    await userEvent.click(await canvas.findByRole("link", { name: "Sign in" }));
    await canvas.findByText("This is the sign-in page");
  },
};

export const CustomFallback: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Switch
          fallback={
            <Stack spacing={1}>
              Not a valid route
              <InternalLink to="/">Back to main demonstration</InternalLink>
            </Stack>
          }
        >
          <Route path="/">
            <MainRouteLinks showInvalid showNestedInvalid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
          <Route path={NESTED_ROUTE} nest>
            <NestedRouter
              fallback={
                <Stack spacing={1}>
                  Not a valid nested route
                  <InternalLink to="/">Back to main demonstration</InternalLink>
                </Stack>
              }
            />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const invalidLink = canvas.getByRole("link", { name: "Go to an invalid route" });
    await userEvent.click(invalidLink);
    await canvas.findByText("Not a valid route");
    await userEvent.click(canvas.getByRole("link", { name: "Back to main demonstration" }));
    await canvas.findByText("Please choose a link");

    const invalidNestedLink = await canvas.findByRole("link", {
      name: "Go to an invalid nested route",
    });
    await userEvent.click(invalidNestedLink);
    await canvas.findByText("Not a valid nested route");
    await userEvent.click(canvas.getByRole("link", { name: "Back to main demonstration" }));
    await canvas.findByText("Please choose a link");
  },
};

export const ParametricRoute: Story = {
  render: ({ userUUID }) => {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/">
            <Stack spacing={1}>
              Please choose a link
              <InternalLink to={`/users/${userUUID}`}>View user details</InternalLink>
              <InternalLink to="/users/hello">Fake link to user details</InternalLink>
            </Stack>
          </Route>
          <Route<{ userId: string }> path={RegExp(`^/users/(?<userId>${UUID_PATTERN})`)}>
            {({ userId }) => {
              return (
                <Stack spacing={1}>
                  This is the page for user with ID {userId}
                  <InternalLink to="/">Back to main demonstration</InternalLink>
                </Stack>
              );
            }}
          </Route>
        </Switch>
      </MemoryRouter>
    );
  },
  args: {
    userUUID: crypto.randomUUID(),
  },
  play: async ({ userEvent, canvas, context }) => {
    const validLink = canvas.getByRole("link", { name: "View user details" });
    await userEvent.click(validLink);
    await canvas.findByText(`This is the page for user with ID ${context.args.userUUID}`);
    await userEvent.click(canvas.getByRole("link", { name: "Back to main demonstration" }));
    await canvas.findByText("Please choose a link");

    const invalidLink = canvas.getByRole("link", { name: "Fake link to user details" });
    await userEvent.click(invalidLink);
    await canvas.findByText("Page Not Found");
    expect(canvas.queryByText(`This is the page for user with ID`)).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("link", { name: "here" }));
    await canvas.findByText("Please choose a link");
  },
};
