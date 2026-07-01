import Typography from "@mui/material/Typography";

import { useAudioContext } from "src/audio/AudioProvider";
interface AudioControlsProps {
  loop?: boolean;
}
/** Controls the tracks provided by the AudioProvider. */
function AudioControls({ loop }: AudioControlsProps) {
  const { currentTrack } = useAudioContext();

  if (currentTrack === null) {
    return <Typography>No track selected</Typography>;
  }

  return (
    <audio src={currentTrack.src} controls loop={loop}>
      <track kind="captions" />
    </audio>
  );
}

export default AudioControls;
