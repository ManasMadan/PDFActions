import React, { useEffect, useState } from "react";
import PDFButtons from "./PDFButtons";

export default function MergePDF({ files, method }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    setFilesLocal(Array.from(files));
  }, []);

  const downloadPDFHandler = async () => {
    await method(filesLocal);
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
