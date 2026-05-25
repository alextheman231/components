import type { OptionalOnCondition } from "@alextheman/utility";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ContextHookOptions } from "src/root/types";

import { DataError } from "@alextheman/utility/v6";
import { createContext, use, useState } from "react";

export interface TrackData {
  title: string;
  src: string;
  artist: string;
}

export interface AudioContextValue {
  tracks: Array<TrackData>;
  currentTrack: TrackData | null;
  setCurrentTrack: Dispatch<SetStateAction<TrackData | null>>;
}
export interface AudioProviderProps {
  tracks: Array<TrackData>;
  children: ReactNode;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

/** Allows access to the audio information provided by AudioProvider. Will fail if AudioProvider could not be accessed and strict mode is true. */
export function useAudioContext<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, AudioContextValue> {
  const context = use(AudioContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "AUDIO_PROVIDER_NOT_FOUND",
      "Could not find the AudioProvider context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, AudioContextValue>;
}

/** Provides audio information to the children components. */
function AudioProvider({ tracks, children }: AudioProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(
    tracks.length === 0 ? null : tracks[0],
  );

  return <AudioContext value={{ tracks, currentTrack, setCurrentTrack }}>{children}</AudioContext>;
}

export default AudioProvider;
