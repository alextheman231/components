import type { TextFieldProps } from "@mui/material/TextField";
import type { Dispatch, SetStateAction } from "react";

import { omitProperties } from "@alextheman/utility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { MdSearch } from "react-icons/md";

export interface SearchBaseProps {
  /** The raw search value state, as it appears in the search bar. */
  rawSearch: string;
  /** A function to update the raw search value state. */
  setRawSearch: Dispatch<SetStateAction<string>>;
  /** A function that runs when the search is submitted. */
  handleSearch: (rawSearch: string) => void | Promise<void>;
}
export type SearchProps = SearchBaseProps & Omit<TextFieldProps, "value">;

/** Renders a search bar for entering and submitting search queries. */
function Search({
  rawSearch,
  setRawSearch,
  handleSearch,
  slotProps,
  onKeyDown,
  onChange,
  ...textFieldProps
}: SearchProps) {
  return (
    <TextField
      label="Search"
      {...textFieldProps}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  handleSearch(rawSearch);
                }}
                aria-label="Submit search"
              >
                <MdSearch />
              </IconButton>
            </InputAdornment>
          ),
          ...slotProps?.input,
        },
        ...omitProperties(slotProps ?? {}, "input"),
      }}
      value={rawSearch}
      onKeyDown={async (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (!event.defaultPrevented) {
          if (event.key === "Enter") {
            await handleSearch(rawSearch);
          }
        }
      }}
      onChange={(event) => {
        if (onChange) {
          onChange(event);
        }
        if (!event.defaultPrevented) {
          setRawSearch(event.target.value);
        }
      }}
    />
  );
}

export default Search;
