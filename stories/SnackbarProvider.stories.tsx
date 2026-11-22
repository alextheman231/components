import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@mui/material/Button";
import { expect } from "storybook/test";

import { SnackbarProvider, useSnackbarContext } from "src/snackbar";
import Snackbars from "src/snackbar/Snackbars";

const meta: Meta<typeof SnackbarProvider> = {
  component: SnackbarProvider,
};

export default meta;
type Story = StoryObj<typeof meta>;

function SnackbarConsumer() {
  const { addSnackbar } = useSnackbarContext();

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

export const Main: Story = {
  render: () => {
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
