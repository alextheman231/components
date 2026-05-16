import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { az } from "@alextheman/utility";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createQueryBoundary, SkeletonRow } from "src";
import z from "zod";

const demoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  composer: z.string(),
  duration: z.object({
    minutes: z.int(),
    seconds: z.int(),
  }),
});

type DemoItemType = z.infer<typeof demoSchema>;

interface DemoProps {
  isLoading: boolean;
  error?: unknown;
  data?: Array<DemoItemType>;
  emptyComponent?: ReactNode;
}

const meta: Meta<DemoProps> = {
  title: "QueryBoundaryDataMap",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  render: ({ isLoading, error, data }: DemoProps) => {
    const QueryBoundary = createQueryBoundary({
      query: { isLoading, error, dataCollection: data },
    });

    return (
      <QueryBoundary.Context>
        <QueryBoundary.Error />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Composer</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <QueryBoundary.Nullable
                nullableComponent={
                  <TableRow>
                    <TableCell colSpan={4}>No data found</TableCell>
                  </TableRow>
                }
              />
              <QueryBoundary.DataMap
                loadingComponent={<SkeletonRow columns={4} />}
                itemParser={(input) => {
                  return az.with(demoSchema).parse(input);
                }}
                emptyComponent={
                  <TableRow>
                    <TableCell colSpan={4}>No songs found</TableCell>
                  </TableRow>
                }
                itemKey={(item) => {
                  return item.id;
                }}
              >
                {(item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.composer}</TableCell>
                      <TableCell>{`${item.duration.minutes}:${item.duration.seconds.toString().padStart(2, "0")}`}</TableCell>
                    </TableRow>
                  );
                }}
              </QueryBoundary.DataMap>
            </TableBody>
          </Table>
        </TableContainer>
      </QueryBoundary.Context>
    );
  },
  args: {
    isLoading: false,
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
  },
};
