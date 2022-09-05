import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFProcess from "../../components/pdfprocess.jsx";

export default function merge() {
  const [files, setFiles] = useState([]);
  const FilePreviewExtra = ({ file }) => {
    return <div>FilePreviewExtra</div>;
  };

  return (
    <>
      <Head>
        <title>PDFActions - Merge PDF</title>
      </Head>

      {files.length === 0 && (
        <FileUploader setFiles={setFiles} fileType=".pdf" multiple={true} />
      )}
      {files.length !== 0 && (
        <PDFProcess
          files={files}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: true,
          }}
          banner={{
            text: "Merge PDF",
            description: "Merge PDF Files Together",
          }}
          LeftSideBoxExtra={null}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </>
  );
}
