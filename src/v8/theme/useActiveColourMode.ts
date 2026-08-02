import type { PaletteMode } from "@mui/material/styles";

import { useColorScheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Get the currently active colour mode from the Material UI theme.
 *
 * @returns Either `light` or `dark`, depending on which is active.
 */
function useActiveColourMode(): PaletteMode {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();

  switch (mode) {
    case "light":
    case "dark": {
      return mode;
    }
    case "system":
    case undefined: {
      return prefersDarkMode ? "dark" : "light";
    }
    default: {
      throw mode satisfies never;
    }
  }
}

/**
 * Get the currently active color mode from the Material UI theme.
 *
 * @returns Either `light` or `dark`, depending on which is active.
 */
export const useActiveColorMode = useActiveColourMode;

export default useActiveColourMode;
