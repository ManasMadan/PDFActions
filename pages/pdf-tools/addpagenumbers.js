import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFProcess from "../../components/PDFProcess.jsx";
import addPageNumbersHandler from "../../methods/addPageNumbers";
import LeftSidePageNumbers from "../../components/LeftSideBoxButtons/LeftSidePageNumbers";

export default function addpagenumbers() {
  const [files, setFiles] = useState([]);

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return null;
  };

  const LeftSideBoxExtra = () => {
    return <LeftSidePageNumbers file={files[0]} />;
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Add Page Numbers to PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Add Page Numbers to PDF
        </div>
        <div>Add Page Numbers to PDF Files</div>
      </div>

      {files.length === 0 && (
        <FileUploader setFiles={setFiles} fileType=".pdf" multiple={false} />
      )}
      {files.length !== 0 && (
        <PDFProcess
          files={files}
          sortableFilePreviewGrid={false}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: false,
          }}
          downloadHandler={() => addPageNumbersHandler(files)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
