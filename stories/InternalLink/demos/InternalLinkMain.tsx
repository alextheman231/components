import type { InternalLinkProps } from "src";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { InternalLink } from "src";

function InternalLinkMain({ children, ...props }: InternalLinkProps) {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<InternalLink {...props}>{children}</InternalLink>} />
        <Route path="/test" element={<InternalLink to="/">Return to root route</InternalLink>} />
        <Route
          path="/patch-it-up"
          element={
            <>
              You have chosen to face the workflow of the damned! Enter if you dare, or
              <InternalLink to="/">return to safety</InternalLink>
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

export default InternalLinkMain;
