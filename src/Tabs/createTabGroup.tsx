import type { JSX, ReactNode } from "react";

import type { TabContextValue } from "src/Tabs/TabProvider";

import TabItem from "src/Tabs/TabItem";
import TabList from "src/Tabs/TabList";
import TabPanel from "src/Tabs/TabPanel";
import TabProvider from "src/Tabs/TabProvider";

export interface TabComponents<TabState extends string = string> {
  /** Provides the context for the tab grouping. */
  Context: (props: { children: ReactNode }) => JSX.Element;
  /** Takes the tabs provided as the children and renders them in a list. Should be used with the tab context. */
  List: typeof TabList;
  /**
   * Renders a tab to be used within the context.
   *
   * @template TabState The possible values for the tab.
   */
  Item: typeof TabItem<TabState>;
  /**
   * Displays the children if the current tab in the `Tab.Context` matches the value prop.
   *
   * @template TabState The possible values for the tab.
   */
  Panel: typeof TabPanel<TabState>;
}

/** A creator function to create the tab group with the tab state fully typed throughout. */
function createTabGroup<TabState extends string = string>({
  tab,
  setTab,
}: TabContextValue<TabState>): TabComponents<TabState> {
  return {
    Context: ({ children }) => {
      return (
        <TabProvider tab={tab} setTab={setTab}>
          {children}
        </TabProvider>
      );
    },
    List: TabList,
    Item: TabItem,
    Panel: TabPanel,
  };
}

export default createTabGroup;
