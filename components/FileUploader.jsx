import React, { useRef } from "react";
import { PDFIcon } from "./icons";

export default function FileUploader({ onFileChange, multiple, fileType }) {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.click();

  return (
    <div className="flex items-center justify-center w-screen h-[90vh]">
      <input
        type="file"
        className="hidden"
        accept={fileType}
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => onFileChange(e)}
      />
      <div
        className="w-[80vw] h-[80vh] border-2 border-amber-400 border-dashed rounded-xl flex items-center justify-center flex-col cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex w-48 items-center justify-evenly mb-4 bg-amber-200 p-4 rounded-xl">
          <PDFIcon />
          Choose File(s)
        </div>

        <div className="text-slate-400">Or Drop File(s) Here</div>
      </div>
    </div>
  );
}
