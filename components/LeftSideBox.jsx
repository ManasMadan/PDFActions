import React from "react";

export default function LeftSideBox({ children, handleAddFileButtonClick }) {
  return (
    <div className="flex flex-col w-full md:w-1/3 md:mr-2">
      <button
        className="px-4 py-2 w-full bg-amber-200 rounded-sm text-md"
        onClick={handleAddFileButtonClick}
      >
        Add File(s)
      </button>
      {children ? children : null}
    </div>
  );
}
