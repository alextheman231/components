import type { ElementType } from "react";

import type { DropdownMenuItemProps as DropdownMenuItemPropsV7 } from "src/v7";

import { DropdownMenuItem as DropdownMenuItemV7 } from "src/v7";

export type DropdownMenuItemProps<RootComponent extends ElementType> =
  DropdownMenuItemPropsV7<RootComponent>;

const DropdownMenuItem = DropdownMenuItemV7;

export default DropdownMenuItem;
