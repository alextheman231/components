import type { ButtonOwnProps } from "@mui/material/Button";
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  MouseEvent,
} from "react";

import Button from "@mui/material/Button";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

import { useDropdownMenuInternal } from "src/v7/components/DropdownMenu/DropdownMenuProvider";

export type DropdownMenuTriggerProps<RootComponent extends ElementType> = {
  /**
   * An optional component to provide to override the current component.
   *
   * Note that the provided component must:
   * - accept a `to` prop.
   * - correctly handle the forwarded `ref`.
   * - render a valid anchor element (or equivalent) for proper accessibility.
   */
  component?: RootComponent;
  /** A function to call whenever the trigger is clicked. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** The ref to forward to allow it to be used with polymorphic components */
  ref?: ComponentPropsWithRef<RootComponent>["ref"];
  /** The icon to display on the button when it is open. */
  openIcon?: ElementType;
  /** The icon to display on the button when it is closed. */
  closedIcon?: ElementType;
} & ComponentPropsWithoutRef<RootComponent> &
  Omit<ButtonOwnProps, "endIcon">;

/**
 * Renders a component which, when clicked, opens the `DropdownMenu` in the current `DropdownMenuProvider`.
 *
 * Note that this component must be used in a `DropdownMenuProvider`. It will error in any other context.
 */
function DropdownMenuTrigger<RootComponent extends ElementType>({
  component,
  onClick,
  openIcon: OpenIcon = MdArrowDropUp,
  closedIcon: ClosedIcon = MdArrowDropDown,
  variant = "contained",
  ...buttonProps
}: DropdownMenuTriggerProps<RootComponent>) {
  const { isDropdownOpen, setAnchorElement } = useDropdownMenuInternal();

  return (
    <Button
      {...(component ? { component } : {})}
      aria-controls={isDropdownOpen ? "dropdown-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
      endIcon={isDropdownOpen ? <OpenIcon /> : <ClosedIcon />}
      variant={variant}
      {...buttonProps}
      onClick={(event: MouseEvent<HTMLElement>) => {
        if (!event.defaultPrevented) {
          setAnchorElement(event.currentTarget);
        }
        if (onClick) {
          onClick(event);
        }
      }}
    />
  );
}

export default DropdownMenuTrigger;
