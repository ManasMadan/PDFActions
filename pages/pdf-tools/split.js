import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import splitPDFHandler from "../../methods/splitPDF";
import FileRotateButtons from "../../components/PDFFile/FilePreviewButtons/FileRotateButtons";
import FileDeleteButton from "../../components/PDFFile/FilePreviewButtons/FileDeleteButton";
import FileRangeInput from "../../components/PDFFile/FilePreviewButtons/FileRangeInput";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";
import getPDFPageCount from "../../methods/getPDFPageCount.js";

export default function split() {
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
        <FileRangeInput file={file} />
        <FileDeleteButton file={file} setDeleted={setDeleted} />
      </div>
    );
  };

  const LeftSideBoxExtra = () => {
    return (
      <>
        <button
          className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md mt-2"
          onClick={() => splitPDFHandler(files, false)}
        >
          Save as Individual Files
        </button>
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Split PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Split PDF
        </div>
        <div>Split Multiple PDF Files In on Go</div>
      </div>

      {files.length === 0 && (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
        />
      )}
      {files.length !== 0 && (
        <PDFFilesProcess
          files={files}
          sortableFilePreviewGrid={false}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: true,
          }}
          banner={{
            text: "Split PDF",
            description: "Split PDF Files In One Go",
          }}
          downloadHandler={() => splitPDFHandler(files)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
