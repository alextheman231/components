import type { Meta, StoryObj } from "@storybook/react-vite";

import type { TrackData } from "src/providers/AudioProvider";

import AudioProvider from "src/providers/AudioProvider";
import AudioControls from "src/providers/AudioProvider/AudioControls";

const meta: Meta<typeof AudioProvider> = {
  component: AudioProvider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    const tracks: Array<TrackData> = [
      {
        title: "Test",
        artist: "Test Artist",
        src: "stories/fixtures/woo.mp3",
      },
    ];

    return (
      <AudioProvider tracks={tracks}>
        <AudioControls />
      </AudioProvider>
    );
  },
};
