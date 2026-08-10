import type { Meta, StoryObj } from "@storybook/react-vite";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { expect } from "storybook/test";

import { Search } from "src/root";

const meta: Meta<typeof Search> = {
  component: Search,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: () => {
    const results = ["first", "second"];
    const [rawSearch, setRawSearch] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

    return (
      <>
        <Search
          fullWidth
          rawSearch={rawSearch}
          setRawSearch={setRawSearch}
          handleSearch={(rawSearch) => {
            setSearchQuery(rawSearch);
          }}
        />
        <Typography>
          {results
            .filter((value) => {
              if (searchQuery === undefined) {
                return false;
              }
              return value.toLowerCase().includes(searchQuery);
            })
            .join(", ")}
        </Typography>
      </>
    );
  },
  play: async ({ userEvent, canvas }) => {
    const searchField = canvas.getByLabelText("Search");
    await userEvent.type(searchField, "second{enter}");
    await expect(await canvas.findByText("second")).toBeInTheDocument();

    const searchButton = canvas.getByRole("button", { name: "Submit search" });
    await userEvent.clear(searchField);
    await userEvent.type(searchField, "first");
    await userEvent.click(searchButton);
    await expect(await canvas.findByText("first")).toBeInTheDocument();
  },
};
