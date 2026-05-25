import type { JSX, ReactNode } from "react";

import type { TabContextValue } from "src/root/groups/Tab/TabProvider";

import TabItem from "src/root/groups/Tab/TabItem";
import TabList from "src/root/groups/Tab/TabList";
import TabPanel from "src/root/groups/Tab/TabPanel";
import TabProvider from "src/root/groups/Tab/TabProvider";

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
