import type { TabsProps } from "@mui/material/Tabs";
import type { ReactNode } from "react";

import Tabs from "@mui/material/Tabs";

import { useTabContext } from "src/Tab/TabProvider";

export interface TabListProps extends Omit<TabsProps, "value"> {
  children: ReactNode;
}

/** Takes the tabs provided as the children and renders them in a list. Should be used with `TabProvider`. */
function TabList({ children, onChange, ...tabListProps }: TabListProps) {
  const { tab, setTab } = useTabContext();

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
