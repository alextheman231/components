import type { ReactNode } from "react";

import { useTabContext } from "src/root/groups/Tab/TabProvider";

export interface TabPanelProps<TabState extends string = string> {
  value: TabState;
  children: ReactNode;
}

/**
 * Displays the children if the current tab matches the value prop.
 *
 * @template TabState The possible values for the tab.
 */
function TabPanel<TabState extends string = string>({ value, children }: TabPanelProps<TabState>) {
  const { tab } = useTabContext();

  if (value === tab) {
    return children;
  }

  return null;
}

export default TabPanel;
