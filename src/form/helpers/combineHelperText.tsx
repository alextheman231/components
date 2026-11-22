import type { ReactNode } from "react";

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
