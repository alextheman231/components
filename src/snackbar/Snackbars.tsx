import type { SyntheticEvent } from "react";

import type { SnackbarItem } from "src/snackbar/SnackbarProvider";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";

import { useSnackbar } from "src/snackbar/SnackbarProvider";

/** Displays the array of snackbars provided by `SnackbarProvider`. */
function Snackbars() {
  const { snackbars, removeSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [currentSnackbar, setCurrentSnackbar] = useState<SnackbarItem | null>(null);

  function onClose(_: SyntheticEvent | Event, reason?: string) {
    if (reason !== "clickaway") {
      setCurrentSnackbar(null);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (!open && snackbars.length !== 0) {
      /* eslint-disable @eslint-react/set-state-in-effect -- This is a legitimate usage as we need to be able to control exactly when the  snackbar gets added/shown. */
      setCurrentSnackbar(snackbars[0]);
      removeSnackbar();
      setOpen(true);
      /* eslint-enable */
    }
  }, [open, removeSnackbar, snackbars]);

  return (
    <Snackbar open={open} autoHideDuration={currentSnackbar?.duration} onClose={onClose}>
      <Alert onClose={onClose} severity={currentSnackbar?.severity ?? "info"}>
        {currentSnackbar?.message}
      </Alert>
    </Snackbar>
  );
}

export default Snackbars;
