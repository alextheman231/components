import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import type { ReactNode } from "react";

import ListItemButton from "@mui/material/ListItemButton";

import InternalLink from "src/deprecated/InternalLink";

export interface ListItemInternalLinkProps extends Omit<ListItemButtonProps, "href"> {
  children: ReactNode;
  to: string;
}

/** @deprecated Probably not that worth centralising here - can be easily recreated per use case. */
function ListItemInternalLink({ children, ...listItemButtonProps }: ListItemInternalLinkProps) {
  return (
    <ListItemButton component={InternalLink} {...listItemButtonProps}>
      {children}
    </ListItemButton>
  );
}

export default ListItemInternalLink;
