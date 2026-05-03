import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface PageProps {
  /** The Page title to show */
  title: ReactNode;
  /** The subtitle to show under the Page title */
  subtitle?: ReactNode;
  /** The actions to show in the page header */
  action?: ReactNode;
  /** The actual page contents */
  children: ReactNode;
  /** Disable the inner padding of the Page contents. */
  disablePadding?: boolean;
}

/** Renders a pre-styled Page that can be used to structure pages throughout your React apps. */
function Page({ title, subtitle, action, children, disablePadding }: PageProps) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {typeof title === "string" ? <Typography variant="h6">{title}</Typography> : title}
            {subtitle ? (
              typeof subtitle === "string" ? (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              )
            ) : null}
          </>
        }
        action={action}
      />
      <Divider />
      {disablePadding ? children : <CardContent>{children}</CardContent>}
    </Card>
  );
}

export default Page;
