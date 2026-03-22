import type { TypographyProps } from "@mui/material/Typography";

import Typography from "@mui/material/Typography";

export interface PopoverTextProps extends TypographyProps {
  text: string;
}

/**
 * @deprecated This component has been deprecated alongside `IconWithPopover`.
 */
function PopoverText({ text, sx, ...typographyProps }: PopoverTextProps) {
  return (
    <>
      {text.split("\n").map((line, index) => {
        return (
          <Typography key={index} sx={{ margin: 1, ...sx }} {...typographyProps}>
            {line}
          </Typography>
        );
      })}
    </>
  );
}

export default PopoverText;
