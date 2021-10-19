import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import MergePDF from "../../components/MergePDF";

export default function merge() {
  const [files, setFiles] = useState([]);

  return (
    <div>
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} />
      ) : (
        <MergePDF files={files} />
      )}
    </div>
  );
}
