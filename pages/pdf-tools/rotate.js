import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import RotatePDF from "../../components/PDFTool";
import rotatePDF from "../../methods/rotatePDF.js";

export default function merge() {
  const [files, setFiles] = useState([]);
  const multiple = true;

  return (
    <div>
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} multiple={multiple} />
      ) : (
        <RotatePDF files={files} method={rotatePDF} multiple={multiple} />
      )}
    </div>
  );
}
