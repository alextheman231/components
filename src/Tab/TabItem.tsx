import type { TabProps } from "@mui/material/Tab";

import Tab from "@mui/material/Tab";

export interface TabItemProps<TabState extends string = string> extends Omit<TabProps, "value"> {
  /** The tab state value associated with the item. */
  value: TabState;
}

/**
 * Renders a tab to be used within a `TabProvider`
 *
 * @template TabState The possible values for the tab.
 */
function TabItem<TabState extends string = string>({
  label,
  value,
  ...tabProps
}: TabItemProps<TabState>) {
  return <Tab label={label ?? value} value={value} {...tabProps} />;
}

export default TabItem;
