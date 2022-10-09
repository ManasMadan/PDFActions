import React from "react";
import { DeleteIcon } from "../../icons.jsx";

export default function FileDeleteButton({ file, setDeleted }) {
  const deleteFileHandler = () => {
    file.deleted = true;
    setDeleted(true);
  };
  return (
    <button
      className="grid place-items-center bg-amber-200 py-2 rounded-md w-3/4"
      onClick={deleteFileHandler}
    >
      <DeleteIcon />
    </button>
  );
}
