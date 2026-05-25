import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { CollapsibleItem } from "src/root";

const meta: Meta<typeof CollapsibleItem> = {
  component: CollapsibleItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: ({ children, ...props }) => {
    return <CollapsibleItem {...props}>{children}</CollapsibleItem>;
  },
  args: {
    children: (
      <Card variant="outlined">
        <CardContent>
          <Typography>The collapsable item is now open.</Typography>
        </CardContent>
      </Card>
    ),
    buttonContents: "Click me",
  },
};
