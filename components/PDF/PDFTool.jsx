import React, { useEffect, useState } from "react";
import PDFButtons from "./PDFButtons";
import imageDataURLfromFile from "../../methods/imageDataURLfromFile";

export default function PDFTool({ files, method, multiple }) {
  const [filesLocal, setFilesLocal] = useState([]);

  useEffect(() => {
    const temp = [];
    const arr = Array.from(files);
    const myFunction = async () => {
      const addFileButton = document.getElementById("addFileButton");
      const processFileButton = document.querySelectorAll("#processFileButton");
      addFileButton.innerText = "Adding Files ...";
      addFileButton.disabled = true;
      processFileButton.forEach((btn) => (btn.disabled = true));

      for (let i = 0; i < arr.length; i++) {
        const file = arr[i];
        const res = await imageDataURLfromFile(file);
        file.image = res.data;
        file.pages = res.pageCount;
        temp.push(file);
      }
      setFilesLocal(temp);
      addFileButton.innerText = "Add Files";
      addFileButton.disabled = false;
      processFileButton.forEach((btn) => (btn.disabled = false));
    };
    myFunction();
  }, []);

  const downloadPDFHandler = async (e) => {
    e.target.innerText = "Processing Files....";
    e.target.disabled = true;
    const filteredFiles = filesLocal.filter((file) => !file.deleted);
    await method(filteredFiles);
    e.target.innerText = "Save and Download";
    e.target.disabled = false;
  };

  return (
    <div className="container">
      <PDFButtons
        filesLocal={filesLocal}
        setFilesLocal={setFilesLocal}
        downloadPDFHandler={downloadPDFHandler}
        multiple={multiple}
      />
    </div>
  );
}
