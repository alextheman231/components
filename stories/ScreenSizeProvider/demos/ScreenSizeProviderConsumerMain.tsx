import Typography from "@mui/material/Typography";
import { useScreenSize } from "src";

function ScreenSizeProviderConsumerMain() {
  const { isLargeScreen, windowWidth, windowHeight } = useScreenSize();

  return (
    <>
      <Typography id="large-screen-text">Size: {isLargeScreen ? "Large" : "Small"}</Typography>
      <Typography id="window-width-text">windowWidth: {windowWidth}</Typography>
      <Typography id="window-height-text">windowHeight: {windowHeight}</Typography>
    </>
  );
}

export default ScreenSizeProviderConsumerMain;
