import type { Meta, StoryObj } from "@storybook/react-vite";

import { normaliseIndents } from "@alextheman/utility";
import Typography from "@mui/material/Typography";
import { Artwork, CollapsableItem, ExternalLink, ReactPlayground } from "src";

const meta: Meta<typeof ReactPlayground> = {
  component: ReactPlayground,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: (props) => {
    return (
      <ReactPlayground scope={{ CollapsableItem, Typography, ExternalLink, Artwork }} {...props} />
    );
  },
  args: {
    code: normaliseIndents`
            <CollapsableItem buttonContents="Display Content">
              <Typography>Message here</Typography>
              <ExternalLink href="https://github.com/alextheman231/components">
                Link to somewhere cool
              </ExternalLink>
            </CollapsableItem>
        `,
  },
};
