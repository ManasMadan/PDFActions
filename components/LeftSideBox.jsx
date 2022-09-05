import React from "react";
import styles from "../styles/pdfprocess.module.css";
import { RotateLeft, RotateRight } from "./icons";

export default function LeftSideBox({ children, handleAddFileButtonClick }) {
  const handleResetClick = () => {};
  const handleRotateLeftClick = () => {};
  const handleRotateRightClick = () => {};

  return (
    <div className="flex flex-col w-full md:w-1/3 md:mr-2">
      <button
        className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md"
        onClick={handleAddFileButtonClick}
      >
        Add File(s)
      </button>
      <div className="flex justify-between mt-2 text-sm">
        <button
          className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
          onClick={handleRotateLeftClick}
        >
          <RotateLeft />
          <span className={styles.rotateText}>Rotate Left</span>
        </button>
        <button
          className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
          onClick={handleRotateRightClick}
        >
          <RotateRight />
          <span className={styles.rotateText}>Rotate Right</span>
        </button>
      </div>
      {children ? children : null}
      <button
        className="px-4 py-2 bg-amber-200 mt-2 rounded-sm tracking-wider"
        onClick={handleResetClick}
      >
        Reset Settings
      </button>
    </div>
  );
}
