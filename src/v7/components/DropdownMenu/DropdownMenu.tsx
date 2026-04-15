import type { MenuProps } from "@mui/material/Menu";
import type { MouseEvent, ReactNode } from "react";

import Menu from "@mui/material/Menu";

import { useDropdownMenuInternal } from "src/v7/components/DropdownMenu/DropdownMenuProvider";

export interface DropdownMenuProps extends Omit<MenuProps, "anchorEl" | "open"> {
  /** The children to render inside of the dropdown. */
  children: ReactNode;
}

/**
 * Renders a menu component that can be used alongside the `DropdownMenuProvider`.
 *
 * This component's open state would be controlled by the `DropdownMenuTrigger`.
 */
function DropdownMenu({ children, onClose, ...menuProps }: DropdownMenuProps) {
  const { anchorElement, isDropdownOpen, closeMenu } = useDropdownMenuInternal();

  return (
    <Menu
      anchorEl={anchorElement}
      open={isDropdownOpen}
      onClose={(event: MouseEvent, reason) => {
        if (!event.defaultPrevented) {
          closeMenu();
        }
        if (onClose) {
          onClose(event, reason);
        }
      }}
      {...menuProps}
    >
      {children}
    </Menu>
  );
}

export default DropdownMenu;
