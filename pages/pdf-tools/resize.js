import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFilesProcess.jsx";
import resizePDFHandler from "../../methods/resizePDF.js";
import FileRotateButtons from "../../components/FilePreviewButtons/FileRotateButtons.jsx";
import FileDeleteButton from "../../components/FilePreviewButtons/FileDeleteButton";
import LeftSideBoxRotation from "../../components/LeftSideBoxButtons/LeftSideBoxRotation";
import LeftSideResizePDF from "../../components/LeftSideBoxButtons/LeftSideResizePDF";
import imageDataURLFromFile from "../../methods/imageDataURLfromFile";

export default function resize() {
  const [files, setFiles] = useState([]);

  const onFileChange = async (e) => {
    const temp = [];
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const data = await imageDataURLFromFile(file, 1);
      file.image = data.image;
      file.pageCount = data.pageCount;
      temp.push(file);
    }

    setFiles(temp);
  };

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
          className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md"
          onClick={() => resizePDFHandler(files, false)}
        >
          Save as Individual Files
        </button>
        <LeftSideResizePDF />
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Resize PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Resize PDF
        </div>
        <div>Resize Multiple PDF Files in on go</div>
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
          downloadHandler={() => resizePDFHandler(files, true)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
