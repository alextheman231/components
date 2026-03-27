import type { JSX, ReactNode } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface NavItemBottom {
  /** The value associated with the nav item. */
  value: string;
  /** The label to display on the nav item. */
  label: string;
  /** An icon to display alongside the nav item. */
  icon?: JSX.Element;
  /** Where in your app the nav item should navigate to. */
  to: string;
}

export interface NavigationBottomProps {
  /** Children to display above the nav bar. */
  children: ReactNode;
  /** An array of nav items to show. */
  navItems: Array<NavItemBottom>;
}

/** Renders a navigation bar at the bottom of the screen. Especially helpful for common navigation options in a mobile app. */
function NavigationBottom({ children, navItems }: NavigationBottomProps) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <Box sx={{ paddingBottom: 7 }}>{children}</Box>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, value) => {
            setValue(value);
          }}
        >
          {navItems.map((item) => {
            return <BottomNavigationAction key={item.value} {...item} component={Link} />;
          })}
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default NavigationBottom;
