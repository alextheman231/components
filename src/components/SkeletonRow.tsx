import { fillArray } from "@alextheman/utility";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export interface SkeletonRowProps {
  /** The number of columns the SkeletonRow should display. */
  columns: number;
}

/** Renders the skeleton of a table row. Often helpful to represent the loading state of the data in your table. */
function SkeletonRow({ columns }: SkeletonRowProps) {
  return (
    <TableRow>
      {fillArray((index) => {
        return (
          <TableCell key={index}>
            <Skeleton />
          </TableCell>
        );
      }, columns)}
    </TableRow>
  );
}

export default SkeletonRow;
