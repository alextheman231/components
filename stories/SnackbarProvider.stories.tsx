import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "src";
import { expect } from "storybook/test";

import Snackbars from "src/providers/Snackbars";

const meta: Meta<typeof SnackbarProvider> = {
  component: SnackbarProvider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    function SnackbarConsumer() {
      const { addSnackbar } = useSnackbar();

      return (
        <Button
          onClick={() => {
            addSnackbar("Snackbar is active", { severity: "success" });
          }}
        >
          Add Snackbar
        </Button>
      );
    }

    return (
      <SnackbarProvider>
        <Snackbars />
        <SnackbarConsumer />
      </SnackbarProvider>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const snackbarButton = canvas.getByRole("button", { name: "Add Snackbar" });
    await userEvent.click(snackbarButton);
    await expect(await canvas.findByText("Snackbar is active")).toBeInTheDocument();
  },
};
