import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import FileProcess from "../../components/FileProcess.jsx";
import LeftSideBox from "../../components/LeftSideBox.jsx";
import FilePreview from "../../components/FilePreview.jsx";

export default function merge() {
  const [files, setFiles] = useState([]);

  return (
    <>
      <Head>
        <title>PDFActions - Merge PDF</title>
      </Head>

      {files.length === 0 && (
        <FileUploader setFiles={setFiles} fileType=".pdf" multiple={true} />
      )}
      {files.length !== 0 && (
        <FileProcess
          bannerText="Merge PDF"
          bannerDescription="Merge PDF Files Together"
          files={files}
          LeftSideBox={LeftSideBox}
          FilePreview={FilePreview}
          addFileOptions={{
            setFiles: setFiles,
            fileType: ".pdf",
            multiple: true,
          }}
        />
      )}
    </>
  );
}
