import type { CreateEnumType } from "@alextheman/utility";
import type { ButtonOwnProps } from "@mui/material/Button";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

export const FileType = {
  PDF: "application/pdf",
  PNG: "image/png",
  JPEG: "image/jpeg",
  JPG: "image/jpg",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  MP3: "audio/mp3",
  MP4: "video/mp4",
  WAV: "audio/wav",
} as const;
export type FileType = CreateEnumType<typeof FileType>;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Dropzone = styled("div")<{ $dragging: boolean }>(({ theme, $dragging }) => {
  return {
    border: "2px dashed",
    borderColor: $dragging ? theme.palette.primary.main : "#ccc",
    backgroundColor: $dragging ? theme.palette.action.hover : "transparent",
    borderRadius: 8,
    padding: "1.5rem",
    textAlign: "center",
    transition: "border-color 0.2s",
    cursor: "pointer",
  };
});

export interface FileInputProps extends ButtonOwnProps {
  /** A function to run when a file has been uploaded. */
  onFileInput: (allowedFiles: Array<File>) => void;
  /** The label to display on the input button (defaults to "Upload files") */
  label?: string;
  /** Whether to accept multiple files or not. */
  multiple?: boolean;
  /** An array of file types to accept. */
  accept?: Array<string>;
  /** Enable the dropzone, allowing users to drag and drop files. */
  useDropzone?: boolean;
}

/** Handles file inputs. */
function FileInput({
  onFileInput,
  label = "Upload files",
  multiple,
  accept,
  useDropzone,
  ...buttonProps
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputButton = (
    <Button
      variant="contained"
      component="label"
      aria-label="File input button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          document.getElementById("file-input")?.click();
        }
      }}
      {...buttonProps}
      startIcon={buttonProps.startIcon ?? <MdCloudUpload />}
    >
      {label}
      <VisuallyHiddenInput
        id="file-input"
        type="file"
        onChange={(event) => {
          const input = event.target;
          onFileInput(Array.from(input.files ?? []));
          input.value = "";
        }}
        multiple={multiple}
        accept={accept?.join(",")}
        disabled={buttonProps.disabled}
      />
    </Button>
  );

  return useDropzone ? (
    <Dropzone
      $dragging={isDragging}
      onDragOver={(event) => {
        event.preventDefault();
        if (buttonProps.disabled) {
          return;
        }
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        if (buttonProps.disabled) {
          return;
        }
        const filesArray = Array.from(event.dataTransfer.files ?? []);
        onFileInput(filesArray);
      }}
    >
      {fileInputButton}
    </Dropzone>
  ) : (
    fileInputButton
  );
}

export default FileInput;
