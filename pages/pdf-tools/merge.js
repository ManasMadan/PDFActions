import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import MergePDF from "../../components/PDF/PDFTool";
import mergePDFHandler from "../../methods/mergePDF";

export default function merge() {
  const [files, setFiles] = useState([]);
  const multiple = true;

  return (
    <div>
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} multiple={multiple} />
      ) : (
        <MergePDF files={files} method={mergePDFHandler} multiple={multiple} />
      )}
    </div>
  );
}
