import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFProcess from "../../components/PDFProcess.jsx";
import mergePDFHandler from "../../methods/mergePDF";
import {
  RotateLeft,
  RotateRight,
  DeleteIcon,
} from "../../components/icons.jsx";
import leftSideBoxExtraStyles from "../../styles/leftSideBoxRotateText.module.css";

export default function merge() {
  const [files, setFiles] = useState([]);

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    const rotateFileLeftHandler = () => {
      const degrees = file.degrees - 90 || -90;
      imageRef.current.style.transform = `rotate(${degrees}deg)`;
      file.degrees = degrees;
    };
    const rotateFileRightHandler = () => {
      const degrees = file.degrees + 90 || 90;
      imageRef.current.style.transform = `rotate(${degrees}deg)`;
      file.degrees = degrees;
    };
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

  const LeftSideBoxExtra = () => {
    const handleDeleteFilesClick = () => {
      setFiles([{ deleted: true }]);
    };
    const handleResetClick = () => {
      const fileThumbnails = document.querySelectorAll(
        ".filePreviewThumbnails"
      );
      fileThumbnails.forEach((fileThumbnail) => {
        fileThumbnail.style.transform = "rotate(0deg)";
      });

      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        file.degrees = 0;
      }
    };
    const handleRotateLeftClick = () => {
      const fileThumbnails = document.querySelectorAll(
        ".filePreviewThumbnails"
      );
      fileThumbnails.forEach((fileThumbnail) => {
        const currRotation = parseInt(
          fileThumbnail.style.transform
            .replace("rotate(", "")
            .replace("deg)", "")
        );

        fileThumbnail.style.transform = `rotate(${currRotation - 90}deg)`;
      });

      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        file.degrees = file.degrees - 90 || -90;
      }
    };
    const handleRotateRightClick = () => {
      const fileThumbnails = document.querySelectorAll(
        ".filePreviewThumbnails"
      );
      fileThumbnails.forEach((fileThumbnail) => {
        const currRotation = parseInt(
          fileThumbnail.style.transform
            .replace("rotate(", "")
            .replace("deg)", "")
        );

        fileThumbnail.style.transform = `rotate(${currRotation + 90}deg)`;
      });

      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        file.degrees = file.degrees + 90 || +90;
      }
    };
    return (
      <>
        <div className="flex justify-between mt-2 text-sm">
          <button
            className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
            onClick={handleRotateLeftClick}
          >
            <RotateLeft />
            <span className={leftSideBoxExtraStyles.rotateText}>
              Rotate Left
            </span>
          </button>
          <button
            className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
            onClick={handleRotateRightClick}
          >
            <RotateRight />
            <span className={leftSideBoxExtraStyles.rotateText}>
              Rotate Right
            </span>
          </button>
        </div>
        <button
          className="px-4 py-2 bg-amber-200 mt-2 rounded-sm tracking-wider"
          onClick={handleResetClick}
        >
          Reset Rotation
        </button>
        <button
          className="px-4 py-2 bg-amber-200 mt-2 rounded-sm tracking-wider"
          onClick={handleDeleteFilesClick}
        >
          Delete All Files
        </button>
      </>
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
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </>
  );
}
