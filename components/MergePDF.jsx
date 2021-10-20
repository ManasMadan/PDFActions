import React, { useEffect, useState } from "react";
import downloadPDFArray from "../methods/downloadPDFArray";
import mergePDF from "../methods/mergePDF";
import PDFButtons from "./PDFButtons";

export default function MergePDF({ files }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    setFilesLocal(Array.from(files));
  }, []);

  const downloadPDFHandler = async () => {
    const pdfBytes = await mergePDF(filesLocal);
    downloadPDFArray(pdfBytes);
  };

  return (
    <div className="container">
      <PDFButtons
        filesLocal={filesLocal}
        setFilesLocal={setFilesLocal}
        downloadPDFHandler={downloadPDFHandler}
      />
    </div>
  );
}
