import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Container from "@mui/material/Container";

export interface ErrorPageProps {
  /** The page title. */
  title: string;
  /** The page content. */
  children: ReactNode;
}

/** Renders a simple page layout for displaying errors. */
function ErrorPage({ title, children }: ErrorPageProps) {
  return (
    <Container maxWidth="sm">
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Container>
  );
}

export default ErrorPage;
