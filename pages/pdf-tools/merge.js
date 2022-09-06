import React, { useEffect, useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFProcess from "../../components/pdfprocess.jsx";
import mergePDFHandler from "../../methods/mergePDF";
import {
  RotateLeft,
  RotateRight,
  DeleteIcon,
} from "../../components/icons.jsx";

export default function merge() {
  const [files, setFiles] = useState([]);

  const FilePreviewExtra = ({ file, setDeleted }) => {
    const rotateFileLeftHandler = () => {};
    const rotateFileRightHandler = () => {};

    const deleteFileHandler = () => {
      file.deleted = true;
      setDeleted(true);
    };

    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <div className="flex items-center justify-evenly w-full">
          <button
            className="px-4 py-2 rounded-md bg-amber-200"
            onClick={rotateFileLeftHandler}
          >
            <RotateLeft />
          </button>
          <button
            className="px-4 py-2 rounded-md bg-amber-200"
            onClick={rotateFileRightHandler}
          >
            <RotateRight />
          </button>
        </div>
        <button
          className="grid place-items-center bg-amber-200 py-2 rounded-md w-3/4"
          onClick={deleteFileHandler}
        >
          <DeleteIcon />
        </button>
      </div>
    );
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
          downloadHandler={() => mergePDFHandler(files)}
          LeftSideBoxExtra={null}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </>
  );
}
