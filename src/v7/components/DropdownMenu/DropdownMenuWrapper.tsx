import type { ElementType, ReactNode } from "react";

import type { DropdownMenuTriggerProps } from "src/v7/components/DropdownMenu/DropdownMenuTrigger";

import DropdownMenu from "src/v7/components/DropdownMenu/DropdownMenu";
import DropdownMenuProvider from "src/v7/components/DropdownMenu/DropdownMenuProvider";
import DropdownMenuTrigger from "src/v7/components/DropdownMenu/DropdownMenuTrigger";

export interface DropdownMenuWrapperProps {
  /** The children to render inside of the dropdown. */
  children: ReactNode;
  /** The button component to be used as the dropdown toggle (defaults to a Material UI Button) */
  trigger?: ElementType;
  /** Props to pass to the Button. */
  triggerProps?: Omit<DropdownMenuTriggerProps<ElementType>, "component">;
}

/**
 * An in-line component that manages the `DropdownMenuProvider` internally. You can just pass in the `DropdownMenuItem` components and it will work as is.
 *
 * This may be used over DropdownMenuProvider if you don't require as much control over the placement of each individual part of the dropdown.
 */
function DropdownMenuWrapper({ children, trigger, triggerProps }: DropdownMenuWrapperProps) {
  return (
    <DropdownMenuProvider>
      <DropdownMenuTrigger component={trigger} {...triggerProps}>
        {triggerProps?.children ?? "Menu"}
      </DropdownMenuTrigger>
      <DropdownMenu>{children}</DropdownMenu>
    </DropdownMenuProvider>
  );
}

export default DropdownMenuWrapper;
