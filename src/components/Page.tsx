import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface PageProps {
  /** The Page title to show */
  title: string;
  /** The subtitle to show under the Page title */
  subtitle?: string;
  /** The actions to show in the page header */
  action?: ReactNode;
  /** The actual page contents */
  children: ReactNode;
}

/** Renders a pre-styled Page that can be used to structure pages throughout your React apps. */
function Page({ title, subtitle, action, children }: PageProps) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            <Typography variant="h6">{title}</Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
          </>
        }
        action={action}
      />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default Page;
