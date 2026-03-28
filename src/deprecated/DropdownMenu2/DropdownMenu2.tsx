import type {
  DropdownMenuContextValue as DropdownMenuContextValueV7,
  DropdownMenuProps,
} from "src/v7";

import { DropdownMenu, useDropdownMenu as useDropdownMenuV7 } from "src/v7";

export type DropdownMenuContextValue = DropdownMenuContextValueV7;

export const useDropdownMenu = useDropdownMenuV7;

/**
 * @deprecated Please use `DropdownMenuProps` from `@alextheman/components/v7` instead.
 *
 * This will be replaced in the root entrypoint in a future release.
 */
export type DropdownMenu2Props = DropdownMenuProps;

/**
 * @deprecated Please use `DropdownMenu` from `@alextheman/components/v7` instead.
 *
 * This will be replaced in the root entrypoint in a future release.
 */
const DropdownMenu2 = DropdownMenu;

export default DropdownMenu2;
