import type { Meta, StoryObj } from "@storybook/react-vite";
import type { LoaderProps } from "src";

import { DataError } from "@alextheman/utility";
import { Loader } from "src";
import { expect } from "storybook/test";
import { vi } from "vitest";

const meta: Meta<typeof Loader> = {
  component: Loader,
  tags: ["!autodocs", "!dev"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function render<DataType>(props: LoaderProps<DataType>) {
  return (
    <Loader {...props}>
      {(data) => {
        return <pre data-testid="loader-data">{JSON.stringify(data, null, 2)}</pre>;
      }}
    </Loader>
  );
}

let consoleSpy: ReturnType<typeof vi.spyOn>;

export const ErrorWithLog: Story = {
  decorators: [
    (Story) => {
      consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      return <Story />;
    },
  ],
  args: {
    isLoading: false,
    error: new DataError(
      { invalid: "Invalid" },
      "PARSING_ERROR",
      "An error occurred while trying to parse the data.",
    ),
    logError: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await expect(consoleSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  },
};

export const ErrorNoLog: Story = {
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  render,
  args: {
    isLoading: false,
    error: new DataError(
      { invalid: "Invalid" },
      "PARSING_ERROR",
      "An error occurred while trying to parse the data.",
    ),
    logError: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  },
};
