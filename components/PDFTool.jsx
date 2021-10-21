import React, { useEffect, useState } from "react";
import PDFButtons from "./PDFButtons";
import imageDataURLfromFile from "../methods/imageDataURLfromFile";

export default function MergePDF({ files, method }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    const temp = [];
    const arr = Array.from(files);
    const myFunction = async () => {
      const button = document.getElementById("addFileButton");
      button.innerText = "Adding Files ...";
      button.disabled = true;
      for (let i = 0; i < arr.length; i++) {
        const file = arr[i];
        const res = await imageDataURLfromFile(file);
        file.image = res;
        temp.push(file);
      }
      setFilesLocal(temp);
      button.innerText = "Add Files";
      button.disabled = false;
    };
    myFunction();
  }, []);

  const downloadPDFHandler = async (e) => {
    e.target.innerText = "Processing Files....";
    e.target.disabled = true;
    await method(filesLocal);
    e.target.innerText = "Save and Download";
    e.target.disabled = false;
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
