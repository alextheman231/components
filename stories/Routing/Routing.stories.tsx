import type { Meta, StoryObj } from "@storybook/react-vite";

import NESTED_ROUTE from "stories/Routing/helpers/constants/NESTED_ROUTE";
import VALID_ROUTE from "stories/Routing/helpers/constants/VALID_ROUTE";
import MainRouteLinks from "stories/Routing/helpers/MainRouteLinks";
import NestedRouter from "stories/Routing/helpers/NestedRouter";
import ValidRouteContents from "stories/Routing/helpers/ValidRouteContents";
import { Route } from "wouter";
import { memoryLocation } from "wouter/memory-location";

import { InternalLink, Router, Switch } from "src/v7";

const meta: Meta = {
  title: "Routing with Wouter (v7)",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
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
      </Router>
    );
  },
};

export const Valid: Story = {
  render: () => {
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
        <Switch>
          <Route path="/">
            <MainRouteLinks showValid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
        </Switch>
      </Router>
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
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
        <Switch>
          <Route path="/">
            <MainRouteLinks showInvalid />
          </Route>
          <Route path={VALID_ROUTE}>
            <ValidRouteContents />
          </Route>
        </Switch>
      </Router>
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
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
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
      </Router>
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
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
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
      </Router>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const validNestedLink = canvas.getByRole("link", { name: "Go to an invalid nested route" });
    await userEvent.click(validNestedLink);
    await canvas.findByText("Page Not Found");
    await userEvent.click(await canvas.findByRole("link", { name: "here" }));
    await canvas.findByText("Please choose a link");
  },
};

export const NestedLink: Story = {
  render: () => {
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
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
      </Router>
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
    const { hook } = memoryLocation({ path: "/" });

    return (
      <Router hook={hook}>
        <Switch
          fallback={
            <>
              Not a valid route
              <InternalLink to="/">Back to main demonstration</InternalLink>
            </>
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
                <>
                  Not a valid nested route
                  <InternalLink to="/">Back to main demonstration</InternalLink>
                </>
              }
            />
          </Route>
        </Switch>
      </Router>
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
