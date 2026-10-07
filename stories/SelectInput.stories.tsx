import type { Meta, StoryObj } from "@storybook/react-vite";

import Typography from "@mui/material/Typography";
import { useState } from "react";

import { SelectInput } from "src/root";

const meta: Meta<typeof SelectInput> = {
  component: SelectInput,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    const [value, setValue] = useState<string>("first");

    return (
      <>
        <SelectInput
          fullWidth
          label="Test"
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          options={[
            {
              label: "First",
              value: "first",
            },
            {
              label: "Second",
              value: "second",
            },
            {
              label: "Third",
              value: "third",
            },
          ]}
        />
        <Typography>{value}</Typography>
      </>
    );
  },
};
