import type { OptionalOnCondition } from "@alextheman/utility";
import type { ButtonOwnProps } from "@mui/material/Button";
import type { ElementType, MouseEvent as ReactMouseEvent, ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility";
import MUIButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { createContext, useContext, useMemo, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export interface DropdownMenuContextValue {
  /** A function responsible for closing the dropdown menu. */
  closeMenu: () => void;
  /** Represents whether or not the dropdown is open. */
  isDropdownOpen: boolean;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined);

/**
  Access the DropdownMenu context directly.
 */
export function useDropdownMenu<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, DropdownMenuContextValue> {
  const context = useContext(DropdownMenuContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "DROPDOWN_MENU_NOT_FOUND",
      "Could not find the DropdownMenu context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, DropdownMenuContextValue>;
}

export interface DropdownMenuProps {
  /** The children to render inside of the dropdown. */
  children: ReactNode;
  /** The button component to be used as the dropdown toggle (defaults to a Material UI Button) */
  button?: ElementType;
  /** Props to pass to the Button. */
  buttonProps?: Omit<ButtonOwnProps, "endIcon"> & {
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  };
  /** The icon to display on the button when it is open. */
  openIcon?: ReactNode;
  /** The icon to display on the button when it is closed. */
  closedIcon?: ReactNode;
}

/** Renders a dropdown menu consisting of `DropdownMenuItem` components imported from this package. */
function DropdownMenu({
  children,
  button: Button = MUIButton,
  buttonProps,
  openIcon = <MdArrowDropUp />,
  closedIcon = <MdArrowDropDown />,
}: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isDropdownOpen = useMemo(() => {
    return !!anchorElement;
  }, [anchorElement]);

  function closeMenu() {
    setAnchorElement(null);
  }

  return (
    <DropdownMenuContext.Provider value={{ closeMenu, isDropdownOpen }}>
      <Button
        aria-controls={isDropdownOpen ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        endIcon={isDropdownOpen ? openIcon : closedIcon}
        {...buttonProps}
        onClick={(event: ReactMouseEvent<HTMLElement>) => {
          if (!event.defaultPrevented) {
            setAnchorElement(event.currentTarget);
          }
          if (buttonProps?.onClick) {
            buttonProps?.onClick(event);
          }
        }}
      />
      <Menu anchorEl={anchorElement} open={isDropdownOpen} onClose={closeMenu}>
        {children}
      </Menu>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu;
