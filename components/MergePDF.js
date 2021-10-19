import React, { useEffect, useState } from "react";
import downloadPDFArray from "../methods/downloadPDFArray";
import mergePDF from "../methods/mergePDF";
import AddFile from "./AddFile";
import FilePreview from "./FilePreview";

export default function MergePDF({ files }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    setFilesLocal(Array.from(files));
  }, [files]);

  const downloadPDFHandler = async () => {
    const pdfBytes = await mergePDF(filesLocal);
    downloadPDFArray(pdfBytes);
  };
  // useEffect(() => {}, [filesLocal]);

  return (
    <div className="container d-flex">
      <div>
        <button className="btn btn-primary" onClick={downloadPDFHandler}>
          Download
        </button>
        <AddFile filesLocal={filesLocal} setFilesLocal={setFilesLocal} />
      </div>
      <div className="container">
        {filesLocal.map((file) => (
          <FilePreview fileName={file.name} />
        ))}
      </div>
    </div>
  );
}
