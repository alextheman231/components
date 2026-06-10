import type { ReactNode } from "react";

export interface TabPanelProps<TabState extends string = string> {
  /** The current tab state. */
  tab: TabState;
  /** The value needed for the current tab state in order to render the children. */
  value: TabState;
  /** The children to render if the value is equal to the current tab state. */
  children: ReactNode;
}

/**
 * Displays the children if the current tab matches the value prop.
 *
 * @template TabState The possible values for the tab.
 */
function TabPanel<TabState extends string = string>({
  value,
  children,
  tab,
}: TabPanelProps<TabState>) {
  if (value === tab) {
    return children;
  }

  return null;
}

export default TabPanel;
