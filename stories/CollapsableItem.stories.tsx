import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CollapsableItem } from "src";

const meta: Meta<typeof CollapsableItem> = {
  component: CollapsableItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: (props) => {
    return <CollapsableItem {...props} />;
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
