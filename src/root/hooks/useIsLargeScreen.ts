import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Determines if the screen size can be considered large.
 *
 * @returns `true` if the screen size is considered large, and `false` otherwise.
 */
function useIsLargeScreen(): boolean {
  const isLargeScreen = useMediaQuery((theme) => {
    return theme.breakpoints.up("md");
  });

  return isLargeScreen;
}

export default useIsLargeScreen;
