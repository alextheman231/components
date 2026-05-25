import Tooltip from "@mui/material/Tooltip";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import SwitchWithIcons from "src/root/components/SwitchWithIcons";
import { useTheme } from "src/root/providers";

/** A toggle to switch between dark mode and light mode. Must be used in a `ThemeProvider`. */
function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
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

export default ThemeToggle;
