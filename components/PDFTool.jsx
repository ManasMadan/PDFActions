import React, { useEffect, useState } from "react";
import PDFButtons from "./PDFButtons";
import imageDataURLfromFile from "../methods/imageDataURLfromFile";

export default function MergePDF({ files, method }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    const temp = [];
    const arr = Array.from(files);
    const myFunction = async () => {
      for (let i = 0; i < arr.length; i++) {
        const file = arr[i];
        const res = await imageDataURLfromFile(file);
        file.image = res;
        temp.push(file);
      }
      setFilesLocal(temp);
    };
    myFunction();
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
