import type { Meta, StoryObj } from "@storybook/react-vite";
import type { QueryBoundaryProps } from "src";

import { DataError, normaliseIndents, parseZodSchema } from "@alextheman/utility";
import Typography from "@mui/material/Typography";
import { QueryBoundary } from "src";
import { expect } from "storybook/test";
import z from "zod";

const meta: Meta<typeof QueryBoundary> = {
  component: QueryBoundary,
};

export default meta;
type Story = StoryObj<typeof meta>;

function render<DataType>(props: QueryBoundaryProps<DataType>) {
  return (
    <QueryBoundary {...props}>
      {(data) => {
        return <pre data-testid="loader-data">{JSON.stringify(data, null, 2)}</pre>;
      }}
    </QueryBoundary>
  );
}

export const Main: Story = {
  render,
  args: {
    isLoading: true,
    error: null,
    data: [
      {
        id: "2ccef308-09af-4575-b9cb-3c8f9b13b14d",
        name: "Commit To You",
        composer: "Alex the Man",
        duration: {
          minutes: 4,
          seconds: 9,
        },
      },
      {
        id: "d8169ecb-e2d3-4e76-8125-0b8e8d70409c",
        name: "An Interface For You And I",
        composer: "Alex the Man",
        duration: {
          minutes: 4,
          seconds: 19,
        },
      },
      {
        id: "5e7f18ed-1241-496c-87a7-c1a2f2b32f16",
        name: "Standards",
        composer: "Alex the Man",
        duration: {
          minutes: 4,
          seconds: 25,
        },
      },
      {
        id: "5e674a7e-ccc2-43c4-b618-a7bd00d47c65",
        name: "alex-c-line",
        composer: "Alex the Man",
        duration: {
          minutes: 3,
          seconds: 50,
        },
      },
      {
        id: "ff487942-2627-4338-acfd-42759a1fcadb",
        name: "Patch It Up",
        composer: "Alex the Man",
        duration: {
          minutes: 4,
          seconds: 31,
        },
      },
    ],
    dataParser: (data) => {
      const exampleSchema = z.array(
        z.object({
          id: z.uuid().optional(),
          name: z.string(),
          composer: z.string(),
          duration: z.object({
            minutes: z.int(),
            seconds: z.int(),
          }),
        }),
      );

      return parseZodSchema(exampleSchema, data);
    },
  },
  argTypes: {
    loadingComponent: { control: false },
    errorComponent: { control: false },
    undefinedComponent: { control: false },
    nullableComponent: { control: false },
    nullComponent: { control: false },
    children: { control: false },
  },
  parameters: {
    docs: {
      source: {
        code: normaliseIndents`
              import { QueryBoundary } from "@alextheman/components";
              import { parseZodSchema } from "@alextheman/utility";
              import { useQuery } from "@tanstack/react-query";
              import axios from "axios";
              import z from "zod";
  
              const dataSchema = z.array(
                z.object({
                  id: z.uuid().optional(),
                  name: z.string(),
                  composer: z.string(),
                  duration: z.object({
                    minutes: z.int(),
                    seconds: z.int(),
                  }),
                })
              )
              
              type Data = z.infer<typeof dataSchema>
  
              function parseData(data: unknown): Data {
                return parseZodSchema(dataSchema, data)
              }
  
              function QueryBoundaryDemo(){
                const { data: songs, isPending, error } = useQuery<Data>({
                  queryKey: "data",
                  queryFn: async () => {
                    const { data } = await axios.get("/api/songs/");
                    return data.songs;
                  }
                })
  
                return (
                  <QueryBoundary data={songs} isPending={isPending} error={error}>
                    {(songs) => {
                      return <pre>{JSON.stringify(songs, null, 2)}</pre>;
                    }}
                  </QueryBoundary>
                )
              }
          `,
      },
    },
  },
};

export const Loading: Story = {
  render,
  args: {
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
    await expect(canvas.queryByTestId("loader-data")).not.toBeInTheDocument();
  },
};

export const Error: Story = {
  render,
  args: {
    isLoading: false,
    error: new DataError(
      { invalid: "Invalid" },
      "PARSING_ERROR",
      "An error occurred while trying to parse the data.",
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await expect(canvas.queryByTestId("loader-data")).not.toBeInTheDocument();
  },
};

export const Data: Story = {
  render,
  args: {
    isLoading: false,
    error: null,
    data: {
      hello: "world",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("progressbar")).not.toBeInTheDocument();
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();

    const loaderData = await canvas.findByTestId("loader-data");
    await expect(loaderData).toBeInTheDocument();

    await expect(loaderData).toHaveTextContent('"hello": "world"');
  },
};

export const Undefined: Story = {
  render,
  args: {
    isLoading: false,
    data: undefined,
    undefinedComponent: <Typography>No data</Typography>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No data")).toBeInTheDocument();
    await expect(canvas.queryByTestId("loader-data")).not.toBeInTheDocument();
  },
};
