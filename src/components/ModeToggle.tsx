import Tooltip from "@mui/material/Tooltip";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
        uncheckedIcon={MdOutlineLightMode}
        checkedIcon={MdOutlineDarkMode}
        checked={isDarkMode}
        onChange={toggleMode}
        aria-label={modeText}
      />
    </Tooltip>
  );
}

export default ModeToggle;
