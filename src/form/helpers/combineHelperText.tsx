import type { ReactNode } from "react";

// eslint-disable-next-line jsdoc/require-jsdoc -- It is an internal helper function so no need for public JSDoc comments.
function combineHelperText(helperText: ReactNode, errors: Array<string>) {
  if (errors.length === 0) {
    return helperText;
  }
  return (
    <>
      {errors.join(", ")}. {helperText}
    </>
  );
}

export default combineHelperText;
