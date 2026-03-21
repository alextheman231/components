import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScreenSizeProvider } from "src";
import ScreenSizeProviderConsumerMain from "stories/ScreenSizeProvider/demos/ScreenSizeProviderConsumerMain";

const meta: Meta<typeof ScreenSizeProvider> = {
  component: ScreenSizeProvider,
};

export default meta;

type Story = StoryObj<typeof meta>;

function setDimensions(screenSize: "large" | "small") {
  window.innerWidth = screenSize === "large" ? 1000 : 600;
  window.innerHeight = screenSize === "large" ? 800 : 500;
  window.dispatchEvent(new Event("resize"));
}

export const Main: Story = {
  render: (props) => {
    return (
      <ScreenSizeProvider {...props}>
        <ScreenSizeProviderConsumerMain />
      </ScreenSizeProvider>
    );
  },
  play: async ({ canvas }) => {
    setDimensions("small");

    await canvas.findByText("Size: Small");
    await canvas.findByText("windowWidth: 600");
    await canvas.findByText("windowHeight: 500");

    setDimensions("large");

    await canvas.findByText("Size: Large");
    await canvas.findByText("windowWidth: 1000");
    await canvas.findByText("windowHeight: 800");
  },
};
