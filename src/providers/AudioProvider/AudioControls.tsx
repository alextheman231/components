import { useAudioContext } from "src/providers/AudioProvider";

/** Controls the tracks provided by the AudioProvider. */
function AudioControls() {
  const { currentTrack } = useAudioContext();

  return (
    <audio src={currentTrack.src} controls>
      <track kind="captions" />
    </audio>
  );
}

export default AudioControls;
