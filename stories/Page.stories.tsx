import type { Meta, StoryObj } from "@storybook/react-vite";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { Page } from "src";

const meta: Meta<typeof Page> = {
  component: Page,
};

export default meta;
type Story = StoryObj<typeof meta>;

type TabState = "first" | "second";

export const Main: Story = {
  render: () => {
    const [tab, setTab] = useState<TabState>("first");
    return (
      <Page
        title="Demo page"
        subtitle="Page subtitle"
        tabs={
          <Tabs
            value={tab}
            onChange={(_, value: TabState) => {
              setTab(value);
            }}
          >
            <Tab label="First tab" value="first" />
            <Tab label="Second tab" value="second" />
          </Tabs>
        }
      >
        {{ first: "Accessing first tab", second: "Accessing second tab" }[tab]}
      </Page>
    );
  },
};
