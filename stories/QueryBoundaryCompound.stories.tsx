import type { Meta, StoryObj } from "@storybook/react-vite";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { createItemQueryBoundary } from "src/QueryBoundary";
import createObjectQueryBoundary from "src/QueryBoundary/creators/createObjectQueryBoundary";

interface RenderProps {
  isLoading: boolean;
  error: unknown;
  data: Data | null | undefined;
}

const meta: Meta<RenderProps> = {
  title: "QueryBoundary Compound Pattern",
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Data {
  id: string;
  name: string;
  composer: string;
  duration: {
    minutes: number;
    seconds: number;
  };
}

export const Main: Story = {
  render: ({ isLoading, error, data }) => {
    const QueryBoundary = createItemQueryBoundary({ query: { isLoading, error, data } });

    return (
      <>
        <QueryBoundary.Error />
        <QueryBoundary.Data>
          {(item) => {
            return (
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{item.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Composer</TableCell>
                      <TableCell>{item.composer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Duration</TableCell>
                      <TableCell>{`${item.duration.minutes}:${item.duration.seconds.toString().padStart(2, "0")}`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </QueryBoundary.Data>
        <QueryBoundary.Nullable nullableFallback={<Typography>No data found</Typography>} />
      </>
    );
  },
  args: {
    isLoading: true,
    error: null,
    data: {
      id: "2ccef308-09af-4575-b9cb-3c8f9b13b14d",
      name: "Commit To You",
      composer: "Alex the Man",
      duration: {
        minutes: 4,
        seconds: 9,
      },
    },
  },
};

export const Object: Story = {
  render: ({ isLoading, error, data }) => {
    const QueryBoundary = createObjectQueryBoundary({ query: { isLoading, error, data } });

    return (
      <>
        <QueryBoundary.Error />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>
                  <QueryBoundary.Value propertyName="name" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Composer</TableCell>
                <TableCell>
                  <QueryBoundary.Value propertyName="composer" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Duration</TableCell>
                <TableCell>
                  <QueryBoundary.Value propertyName="duration">
                    {(duration) => {
                      return `${duration.minutes}:${duration.seconds.toString().padStart(2, "0")}`;
                    }}
                  </QueryBoundary.Value>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <QueryBoundary.Nullable nullableFallback={<Typography>No data found</Typography>} />
      </>
    );
  },
  args: {
    isLoading: true,
    error: null,
    data: {
      id: "2ccef308-09af-4575-b9cb-3c8f9b13b14d",
      name: "Commit To You",
      composer: "Alex the Man",
      duration: {
        minutes: 4,
        seconds: 9,
      },
    },
  },
};
