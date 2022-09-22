import React from "react";

export default function LeftSideBox({
  children,
  handleAddFileButtonClick,
  handleDeleteFilesClick,
  multiple,
}) {
  return (
    <div className="flex flex-col w-full md:w-1/3 md:mr-2">
      {multiple && (
        <button
          className="px-4 py-2 w-full mb-2 bg-amber-200 rounded-sm text-md"
          onClick={handleAddFileButtonClick}
        >
          Add File(s)
        </button>
      )}
      {children ? children : null}
      {multiple && (
        <button
          className="px-4 py-2 bg-amber-200 mt-2 rounded-sm tracking-wider"
          onClick={handleDeleteFilesClick}
        >
          Delete Files
        </button>
      )}
    </div>
  );
}
