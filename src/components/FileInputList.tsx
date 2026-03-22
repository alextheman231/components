import type { Dispatch, SetStateAction } from "react";

import type { FileInputProps } from "src/components/FileInput";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { MdDelete } from "react-icons/md";

import FileInput from "src/components/FileInput";

export interface FileInputListProps extends Omit<FileInputProps, "onFileInput"> {
  /** The array of files (must be a React state). */
  files: Array<File>;
  /** The state setter for the array of files. */
  setFiles: Dispatch<SetStateAction<Array<File>>>;
}

/** Renders the `FileInput` component with a list of uploaded files underneath it. */
function FileInputList({
  files,
  setFiles,
  multiple = true,
  ...fileInputProps
}: FileInputListProps) {
  function onFileInput(newFiles: Array<File>) {
    setFiles((oldFiles) => {
      return [...oldFiles, ...newFiles];
    });
  }

  return (
    <Box>
      <FileInput {...fileInputProps} multiple={multiple} onFileInput={onFileInput} />
      <List>
        {files.map((file) => {
          return (
            <ListItem
              key={`${file.name}-${file.lastModified}`}
              secondaryAction={
                <IconButton
                  aria-label="Delete"
                  edge="end"
                  onClick={() => {
                    setFiles((oldFiles) => {
                      return oldFiles.filter((fileToDelete) => {
                        return fileToDelete !== file;
                      });
                    });
                  }}
                >
                  <MdDelete />
                </IconButton>
              }
            >
              <ListItemText primary={file.name} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default FileInputList;
