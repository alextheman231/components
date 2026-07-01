import type { Meta, StoryObj } from "@storybook/react-vite";

import type { TrackData } from "src/audio/AudioProvider";

import AudioControls from "src/audio/AudioControls";
import AudioProvider from "src/audio/AudioProvider";

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

export const Loop: Story = {
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
        <AudioControls loop />
      </AudioProvider>
    );
  },
};
