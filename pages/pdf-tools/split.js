import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import SplitPDF from "../../components/PDFTool";
import splitPDFHandler from "../../methods/splitPDF";
// Incomplete
// Split PDF Handler
// Range Selector in File Preview

export default function merge() {
  const [files, setFiles] = useState([]);
  const multiple = true;

  return (
    <div>
      <h2>Incomplete</h2>
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} multiple={multiple} />
      ) : (
        <SplitPDF files={files} method={splitPDFHandler} multiple={multiple} />
      )}
    </div>
  );
}
