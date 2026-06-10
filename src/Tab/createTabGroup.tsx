import type { JSX, ReactNode } from "react";

import type { TabItemProps } from "src/Tab/TabItem";
import type { TabListProps } from "src/Tab/TabList";
import type { TabPanelProps } from "src/Tab/TabPanel";
import type { TabContextValue } from "src/Tab/TabProvider";

import TabItem from "src/Tab/TabItem";
import TabList from "src/Tab/TabList";
import TabPanel from "src/Tab/TabPanel";

export interface TabComponents<TabState extends string = string> {
  /**
   * Provides the context for the tab grouping.
   *
   * @deprecated This no longer does anything and can now be removed. All other components in this group can be used without the context present.
   */
  Context: (props: { children: ReactNode }) => JSX.Element | null;
  /** Takes the tabs provided as the children and renders them in a list. Should be used with the tab context. */
  List: (props: Omit<TabListProps<TabState>, "tab" | "setTab">) => JSX.Element;
  /**
   * Renders a tab to be used within the context.
   *
   * @template TabState The possible values for the tab.
   */
  Item: (props: Omit<TabItemProps<TabState>, "tab" | "setTab">) => JSX.Element;
  /**
   * Displays the children if the current tab in the `Tab.Context` matches the value prop.
   *
   * @template TabState The possible values for the tab.
   */
  Panel: (props: Omit<TabPanelProps<TabState>, "tab" | "setTab">) => JSX.Element;
}

/** A creator function to create the tab group with the tab state fully typed throughout. */
function createTabGroup<TabState extends string = string>({
  tab,
  setTab,
}: TabContextValue<TabState>): TabComponents<TabState> {
  return {
    Context: () => {
      return null;
    },
    List: (props) => {
      return <TabList tab={tab} setTab={setTab} {...props} />;
    },
    Item: TabItem,
    Panel: (props) => {
      return <TabPanel tab={tab} {...props} />;
    },
  };
}

export default createTabGroup;
