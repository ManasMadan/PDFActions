import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import breakPDFHandler from "../../methods/breakPDF.js";
import FileRotateButtons from "../../components/PDFFile/FilePreviewButtons/FileRotateButtons";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";
import LeftSideBreakPDF from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBreakPDF";
import getPDFPageCount from "../../methods/getPDFPageCount.js";

export default function breakPDF() {
  const [files, setFiles] = useState([]);

  const onFileChange = async (e) => {
    const temp = [];
    const newFiles = e.target.files;

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      file.pageCount = await getPDFPageCount(file);
      temp.push(file);
    }

    setFiles([...files, ...temp]);
  };

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <FileRotateButtons file={file} imageRef={imageRef} />
      </div>
    );
  };

  const LeftSideBoxExtra = () => {
    return (
      <>
        <button
          className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md"
          onClick={() => breakPDFHandler(files, false)}
        >
          Save as Individual Files
        </button>
        <LeftSideBreakPDF file={files[0]} />
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Break PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Break PDF
        </div>
        <div>Break Single PDF File into Multiple PDF's</div>
      </div>

      {files.length === 0 && (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={false}
        />
      )}
      {files.length !== 0 && (
        <PDFFilesProcess
          files={files}
          sortableFilePreviewGrid={false}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: false,
          }}
          downloadHandler={() => breakPDFHandler(files, true)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
