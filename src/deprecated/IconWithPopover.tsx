import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";
import type { ElementType, MouseEvent as ReactMouseEvent, ReactNode } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useId, useState } from "react";
import { MdVisibility } from "react-icons/md";

export interface IconWithPopoverProps {
  icon?:
    | (OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
        muiName: string;
      })
    | ElementType;
  onOpen?: () => void;
  onClose?: () => void;
  iconProps?: SvgIconTypeMap<unknown, "svg">["props"];
  children: ReactNode;
}

/**
 * @deprecated This component is not well-designed for accessibility purposes. Please use the `Tooltip` component from `@mui/material` instead.
 *
 * @example
 * ```tsx
 * <Tooltip title="Text to display on hover">
 *   <MdVisibility />
 * </Tooltip>
 * ```
 */
function IconWithPopover({
  icon: Icon = MdVisibility,
  onOpen,
  onClose,
  iconProps,
  children,
}: IconWithPopoverProps) {
  const [anchorElement, setAnchorElement] = useState<Element | null>(null);
  const isPopoverOpen = !!anchorElement;
  const popoverId = useId();

  function handleOpen(event: ReactMouseEvent<SVGSVGElement, MouseEvent>) {
    setAnchorElement(event.currentTarget);
    if (onOpen) {
      onOpen();
    }
  }

  function handleClose() {
    setAnchorElement(null);
    if (onClose) {
      onClose();
    }
  }

  return (
    <Box>
      <Icon
        aria-owns={isPopoverOpen ? popoverId : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...iconProps}
      />
      <Popover
        id={popoverId}
        disablePortal
        disableScrollLock
        slotProps={{
          root: {
            disableEnforceFocus: true,
            disableAutoFocus: true,
            disableRestoreFocus: true,
          },
        }}
        sx={{ pointerEvents: "none" }}
        open={isPopoverOpen}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </Box>
  );
}

export default IconWithPopover;
