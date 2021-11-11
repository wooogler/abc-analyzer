import Papa from "papaparse";
import React, { ReactElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImportCSV(): ReactElement {
  const onDrop = useCallback((files: File[]) => {
    files.forEach((file) =>
      Papa.parse(file, {
        complete: (results) => {
          console.log(file.name, results.data);
        },
      })
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>Upload csv files here</div>
    </div>
  );
}

export default ImportCSV;
