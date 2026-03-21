import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Tooltip from "@mui/material/Tooltip";

import SwitchWithIcons from "src/components/SwitchWithIcons";
import { useMode } from "src/providers";

/** A toggle to switch between dark mode and light mode. Must be used in a `ModeProvider`. */
function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const isDarkMode = mode === "dark";
  const modeText = `Enable ${isDarkMode ? "light" : "dark"} mode`;

  return (
    <Tooltip title={modeText}>
      <SwitchWithIcons
        uncheckedIcon={LightMode}
        checkedIcon={DarkMode}
        checked={isDarkMode}
        onChange={toggleMode}
        aria-label={modeText}
      />
    </Tooltip>
  );
}

export default ModeToggle;
