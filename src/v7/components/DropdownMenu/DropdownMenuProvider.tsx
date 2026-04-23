import type { OptionalOnCondition } from "@alextheman/utility";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility/v6";
import { createContext, useContext, useMemo, useState } from "react";

export interface DropdownMenuContextValue {
  /** A function responsible for closing the dropdown menu. */
  closeMenu: () => void;
  /** Represents whether or not the dropdown is open. */
  isDropdownOpen: boolean;
}

export type DropdownMenuInternalContextValue = DropdownMenuContextValue & {
  anchorElement: HTMLElement | null;
  setAnchorElement: Dispatch<SetStateAction<HTMLElement | null>>;
};
const DropdownMenuContext = createContext<DropdownMenuInternalContextValue | undefined>(undefined);

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

// eslint-disable-next-line jsdoc/require-jsdoc
export function useDropdownMenuInternal<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, DropdownMenuInternalContextValue> {
  return useDropdownMenu({ strict }) as OptionalOnCondition<
    Strict,
    DropdownMenuInternalContextValue
  >;
}

export interface DropdownMenuProviderProps {
  /** The children to render inside of the dropdown. */
  children: ReactNode;
}

/** Provides shared context for the `DropdownMenu` related components. */
function DropdownMenuProvider({ children }: DropdownMenuProviderProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isDropdownOpen = useMemo(() => {
    return !!anchorElement;
  }, [anchorElement]);

  function closeMenu() {
    setAnchorElement(null);
  }

  return (
    <DropdownMenuContext.Provider
      value={{ closeMenu, isDropdownOpen, anchorElement, setAnchorElement }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenuProvider;
