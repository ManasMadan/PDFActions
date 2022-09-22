import React from "react";
import { RotateLeft, RotateRight } from "../icons.jsx";
import leftSideBoxExtraStyles from "../../styles/leftSideBoxRotateText.module.css";

export default function LeftSideBoxRotation({ files }) {
  const handleResetClick = () => {
    const fileThumbnails = document.querySelectorAll(".filePreviewThumbnails");
    fileThumbnails.forEach((fileThumbnail) => {
      fileThumbnail.style.transform = "rotate(0deg)";
    });

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      file.degrees = 0;
    }
  };
  const handleRotateLeftClick = () => {
    const fileThumbnails = document.querySelectorAll(".filePreviewThumbnails");
    fileThumbnails.forEach((fileThumbnail) => {
      const currRotation = parseInt(
        fileThumbnail.style.transform.replace("rotate(", "").replace("deg)", "")
      );

      fileThumbnail.style.transform = `rotate(${currRotation - 90}deg)`;
    });

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      file.degrees = file.degrees - 90 || -90;
    }
  };
  const handleRotateRightClick = () => {
    const fileThumbnails = document.querySelectorAll(".filePreviewThumbnails");
    fileThumbnails.forEach((fileThumbnail) => {
      const currRotation = parseInt(
        fileThumbnail.style.transform.replace("rotate(", "").replace("deg)", "")
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
      <div className="flex justify-between text-sm mt-2">
        <button
          className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
          onClick={handleRotateLeftClick}
        >
          <RotateLeft />
          <span className={leftSideBoxExtraStyles.rotateText}>Rotate Left</span>
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
    </>
  );
}
