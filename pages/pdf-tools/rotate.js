import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFProcess from "../../components/PDFProcess.jsx";
import rotatePDFHandler from "../../methods/rotatePDF";
import FileRotateButtons from "../../components/FilePreviewButtons/FileRotateButtons.jsx";
import FileDeleteButton from "../../components/FilePreviewButtons/FileDeleteButton.jsx";
import LeftSideBoxRotation from "../../components/LeftSideBoxButtons/LeftSideBoxRotation";

export default function rotate() {
  const [files, setFiles] = useState([]);

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <FileRotateButtons file={file} imageRef={imageRef} />
        <FileDeleteButton file={file} setDeleted={setDeleted} />
      </div>
    );
  };

  const LeftSideBoxExtra = () => {
    return (
      <>
        <button
          className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md mt-2"
          onClick={() => rotatePDFHandler(files, false)}
        >
          Save as Individual Files
        </button>
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>PDFActions - Rotate PDF</title>
      </Head>

      {files.length === 0 && (
        <FileUploader setFiles={setFiles} fileType=".pdf" multiple={true} />
      )}
      {files.length !== 0 && (
        <PDFProcess
          files={files}
          sortableFilePreviewGrid={false}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: true,
          }}
          banner={{
            text: "Rotate PDF",
            description: "Rotate PDF Files In One Go",
          }}
          downloadHandler={() => rotatePDFHandler(files)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </>
  );
}
