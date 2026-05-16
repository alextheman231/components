import type { Meta, StoryObj } from "@storybook/react-vite";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { createQueryBoundary } from "src";

interface RenderProps {
  isLoading: boolean;
  error: unknown;
  data: Data | null | undefined;
}

const meta: Meta<RenderProps> = {
  title: "QueryBoundary Compound Pattern (v7)",
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
    const QueryBoundary = createQueryBoundary({ query: { isLoading, error, data } });

    function NullableComponent() {
      return <Typography>No data found</Typography>;
    }

    return (
      <QueryBoundary.Context>
        <QueryBoundary.Error />
        <QueryBoundary.Data>
          {(item) => {
            return (
              <TableContainer>
                <Table>
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
                </Table>
              </TableContainer>
            );
          }}
        </QueryBoundary.Data>
        <QueryBoundary.Nullable nullableComponent={<NullableComponent />} />
      </QueryBoundary.Context>
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
