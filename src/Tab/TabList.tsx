import type { TabsProps } from "@mui/material/Tabs";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import Tabs from "@mui/material/Tabs";

export interface TabListProps<TabState extends string = string> extends Omit<TabsProps, "value"> {
  /** The current tab state. */
  tab: TabState;
  /** A function to change the current tab state. */
  setTab: Dispatch<SetStateAction<TabState>>;
  /** The TabItem components to render. */
  children: ReactNode;
}

/** Takes the tabs provided as the children and renders them in a list. Should be used with `TabProvider`. */
function TabList<TabState extends string = string>({
  children,
  onChange,
  tab,
  setTab,
  ...tabListProps
}: TabListProps<TabState>) {
  return (
    <Tabs
      value={tab}
      onChange={(event, value) => {
        if (onChange) {
          onChange(event, value);
        }
        if (event.defaultPrevented) {
          return;
        }
        setTab(value);
      }}
      {...tabListProps}
    >
      {children}
    </Tabs>
  );
}

export default TabList;
