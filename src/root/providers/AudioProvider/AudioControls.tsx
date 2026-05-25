import Typography from "@mui/material/Typography";

import { useAudioContext } from "src/root/providers/AudioProvider";

/** Controls the tracks provided by the AudioProvider. */
function AudioControls() {
  const { currentTrack } = useAudioContext();

  if (currentTrack === null) {
    return <Typography>No track selected</Typography>;
  }

  return (
    <audio src={currentTrack.src} controls>
      <track kind="captions" />
    </audio>
  );
}

export default AudioControls;
