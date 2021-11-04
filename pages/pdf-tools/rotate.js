import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import RotatePDF from "../../components/PDF/PDFTool";
import rotatePDF from "../../methods/rotatePDF.js";
import Head from "next/head";

export default function merge() {
  const [files, setFiles] = useState([]);
  const multiple = true;

  return (
    <>
      <Head>
        <title>PDFActions - Rotate PDF</title>
      </Head>
      <div>
        {files.length === 0 ? (
          <FileUploader setFiles={setFiles} multiple={multiple} />
        ) : (
          <RotatePDF files={files} method={rotatePDF} multiple={multiple} />
        )}
      </div>
    </>
  );
}
