import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import SplitPDF from "../../components/PDF/PDFTool";
import splitPDFHandler from "../../methods/splitPDF";

export default function merge() {
  const [files, setFiles] = useState([]);
  const multiple = true;

  return (
    <div>
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} multiple={multiple} />
      ) : (
        <SplitPDF files={files} method={splitPDFHandler} multiple={multiple} />
      )}
    </div>
  );
}
