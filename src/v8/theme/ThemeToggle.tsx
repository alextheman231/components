import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import SwitchWithIcons from "src/root/components/SwitchWithIcons";
import useActiveColourMode from "src/v8/theme/useActiveColourMode";

/** A toggle to switch between dark mode and light mode. Must be used in a Material UI `ThemeProvider`. */
function ThemeToggle() {
  const mode = useActiveColourMode();
  const { setMode } = useColorScheme();

  const isDarkMode = mode === "dark";
  const modeText = `Enable ${isDarkMode ? "light" : "dark"} mode`;

  return (
    <Tooltip title={modeText}>
      <SwitchWithIcons
        uncheckedIcon={MdOutlineLightMode}
        checkedIcon={MdOutlineDarkMode}
        checked={isDarkMode}
        onChange={(_, checked) => {
          setMode(checked ? "dark" : "light");
        }}
        aria-label={modeText}
      />
    </Tooltip>
  );
}

export default ThemeToggle;
