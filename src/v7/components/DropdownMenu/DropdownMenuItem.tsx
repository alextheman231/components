import type Button from "@mui/material/Button";
import type { MenuItemOwnProps } from "@mui/material/MenuItem";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from "react";

import MenuItem from "@mui/material/MenuItem";

import { useDropdownMenu } from "src/v7/components/DropdownMenu/DropdownMenuProvider";

export type DropdownMenuItemProps<RootComponent extends ElementType = typeof Button> = {
  /**
   * An optional component to provide to override the current component.
   *
   * Note that the provided component must:
   * - accept a `to` prop.
   * - correctly handle the forwarded `ref`.
   * - render a valid anchor element (or equivalent) for proper accessibility.
   */
  component?: RootComponent;
  /** The children to be rendered within the menu item. */
  children?: ReactNode;
  /** The ref to forward to allow it to be used with polymorphic components */
  ref?: ComponentPropsWithRef<RootComponent>["ref"];
  /** A function to execute after clicking the item. */
  onClick?: ComponentProps<RootComponent>["onClick"];
} & Omit<ComponentPropsWithoutRef<RootComponent>, "children" | "ref"> &
  MenuItemOwnProps;

/** Represents a menu item to be used inside the `DropdownMenu`. It must be used as children of the `DropdownMenu` component. */
function DropdownMenuItem<RootComponent extends ElementType = typeof Button>({
  component,
  children,
  ref,
  onClick,
  ...menuItemProps
}: DropdownMenuItemProps<RootComponent>) {
  const { closeMenu } = useDropdownMenu();

  return (
    <MenuItem
      component={component}
      ref={ref}
      {...menuItemProps}
      onClick={(event) => {
        if (!event.defaultPrevented) {
          closeMenu();
        }
        if (onClick) {
          onClick(event);
        }
      }}
    >
      {children}
    </MenuItem>
  );
}

export default DropdownMenuItem;
