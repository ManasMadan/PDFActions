import React from "react";
import styles from "../styles/fileprocess.module.css";

export default function LeftSideBox({ children, addFileButtonRef }) {
  const handleClick = () => addFileButtonRef.current.click();
  const handleResetClick = () => {};
  const handleRotateLeftClick = () => {};
  const handleRotateRightClick = () => {};

  return (
    <div className="flex flex-col w-full md:w-1/3 md:mr-2">
      <button
        className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md"
        onClick={handleClick}
      >
        Add File(s)
      </button>
      <div className="flex justify-between mt-2 text-sm">
        <button
          className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
          onClick={handleRotateLeftClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="ms-1 me-1"
            viewBox="0 0 16 16"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 11-4.546 2.914.5.5 0 00-.908-.417A6 6 0 108 2v1z"
            ></path>
            <path d="M8 4.466V.534a.25.25 0 00-.41-.192L5.23 2.308a.25.25 0 000 .384l2.36 1.966A.25.25 0 008 4.466z"></path>
          </svg>
          <span className={styles.rotateText}>Rotate Left</span>
        </button>
        <button
          className="hover:bg-amber-200 px-4 py-2 border-2 w-1/2 flex items-center justify-evenly"
          onClick={handleRotateRightClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="ms-1 me-1"
            viewBox="0 0 16 16"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 104.546 2.914.5.5 0 01.908-.417A6 6 0 118 2v1z"
            ></path>
            <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"></path>
          </svg>
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
