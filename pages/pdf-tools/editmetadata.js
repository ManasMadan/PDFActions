import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import editMetaDataHandler from "../../methods/editMetaData";
import LeftSideEditMetaData from "../../components/PDFFile/LeftSideBoxButtons/LeftSideEditMetaData";

export default function editmetadata() {
  const [files, setFiles] = useState([]);
  const [metaDataOptions, setMetaDataOptions] = useState({
    title: "",
    subject: "",

    author: "",
    creator: "",
    producer: "",

    keywords: [],
    documentCreationDate: new Date(),
    documentModificationDate: new Date(),
  });

  const onFileChange = async (e) => {
    setFiles([...e.target.files]);
  };

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return null;
  };

  const LeftSideBoxExtra = () => {
    return (
      <LeftSideEditMetaData
        metaDataOptions={metaDataOptions}
        setMetaDataOptions={setMetaDataOptions}
      />
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Edit PDF Meta Data</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Edit PDF Meta Data
        </div>
        <div>Edit Meta Data of PDF Files</div>
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
          downloadHandler={() => editMetaDataHandler(files, metaDataOptions)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
