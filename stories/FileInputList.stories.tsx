import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FileInputListProps } from "src";

import { DataError } from "@alextheman/utility";
import { useState } from "react";
import { FileInputList } from "src";
import { expect, waitFor, within } from "storybook/test";

const meta: Meta<typeof FileInputList> = {
  component: FileInputList,
};

export default meta;
type Story = StoryObj<typeof meta>;

function render(props: FileInputListProps) {
  const [files, setFiles] = useState<Array<File>>([]);
  return <FileInputList {...props} files={files} setFiles={setFiles} />;
}

export const Main: Story = {
  render,
  args: {
    useDropzone: true,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("File input button");
    await userEvent.upload(input, new File(["Hello"], "hello.pdf"));
    await canvas.findByText("hello.pdf");

    const deleteButton = canvas.getByLabelText("Delete");

    await userEvent.click(deleteButton);
    await waitFor(() => {
      expect(canvas.queryByText("hello.pdf")).not.toBeInTheDocument();
    });
  },
};

export const Multiple: Story = {
  render,
  args: {
    useDropzone: true,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("File input button");
    await userEvent.upload(input, [
      new File(["Hello"], "hello.pdf"),
      new File(["World"], "world.pdf"),
    ]);
    await canvas.findByText("hello.pdf");
    await canvas.findByText("world.pdf");

    const secondListItem = canvas.getByText("world.pdf").closest("li");

    if (!secondListItem) {
      throw new DataError(
        { expected: "world.pdf", received: secondListItem },
        "NO_SECOND_LIST_ITEM",
        "Expected to find the second list item but could not find it.",
      );
    }

    const secondDeleteButton = within(secondListItem).getByLabelText("Delete");

    await userEvent.click(secondDeleteButton);

    await waitFor(() => {
      expect(canvas.queryByText("world.pdf")).not.toBeInTheDocument();
    });
    expect(canvas.getByText("hello.pdf")).toBeInTheDocument();
  },
};
