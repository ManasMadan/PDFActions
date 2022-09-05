import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";

export default function merge() {
  const [files, setFiles] = useState([]);

  return (
    <>
      <Head>
        <title>PDFActions - Split PDF</title>
      </Head>

      {files.length === 0 && (
        <div>
          <FileUploader setFiles={setFiles} fileTypes=".pdf" multiple={true} />
        </div>
      )}

      {files.length !== 0 && <div>Number of Files : {files.length}</div>}
    </>
  );
}
