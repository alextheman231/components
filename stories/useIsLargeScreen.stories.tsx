import type { Meta, StoryObj } from "@storybook/react-vite";

import Typography from "@mui/material/Typography";

import { useIsLargeScreen } from "src/root";
import { ThemeProvider } from "src/theme";

const meta: Meta = {
  title: "useIsLargeScreen",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    function Consumer() {
      const isLargeScreen = useIsLargeScreen();

      return (
        <>
          <Typography id="large-screen-text">Size: {isLargeScreen ? "Large" : "Small"}</Typography>
        </>
      );
    }

    return (
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
  },
};
