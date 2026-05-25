import type { OptionalOnCondition } from "@alextheman/utility";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ContextHookOptions } from "src/root";

import { DataError } from "@alextheman/utility/v6";
import { createContext, use } from "react";

export interface TabContextValue<TabState extends string = string> {
  tab: TabState;
  setTab: Dispatch<SetStateAction<TabState>>;
}

export interface TabProviderProps<
  TabState extends string = string,
> extends TabContextValue<TabState> {
  children: ReactNode;
}

export const TabContext = createContext<TabContextValue<any> | undefined>(undefined);
/** Access the TabContext directly. */
export function useTabContext<TabState extends string = string, Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, TabProviderProps<TabState>> {
  const context = use(TabContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "TAB_PROVIDER_NOT_FOUND",
      "Could not find the TabProvider. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, TabProviderProps<TabState>>;
}

/**
 * A provider for a context that manages tab grouping.
 *
 * @template TabState The possible values for the tab.
 */
function TabProvider<TabState extends string = string>({
  children,
  tab,
  setTab,
}: TabProviderProps<TabState>) {
  return <TabContext value={{ tab, setTab }}>{children}</TabContext>;
}

export default TabProvider;
