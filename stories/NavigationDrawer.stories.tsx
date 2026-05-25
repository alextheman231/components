import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@mui/material/Button";

import { Page } from "src/root";
import { MemoryRouter, NavigationDrawer } from "src/routing";
import { ThemeProvider } from "src/theme";
import ThemeToggle from "src/theme/ThemeToggle";

const meta: Meta<typeof NavigationDrawer> = {
  component: NavigationDrawer,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  parameters: {
    disableWrapper: true,
  },

  render: () => {
    return (
      <ThemeProvider>
        <MemoryRouter>
          <NavigationDrawer
            title="Navigation Drawer"
            headerElements={
              <>
                <ThemeToggle />
                <Button>Actions</Button>
              </>
            }
            navItems={[
              {
                category: "Main",
                options: [
                  {
                    label: "Homepage",
                    to: "/",
                  },
                ],
              },
            ]}
          >
            <Page title="Navigation Drawer">Page contents here</Page>
          </NavigationDrawer>
        </MemoryRouter>
      </ThemeProvider>
    );
  },
};
