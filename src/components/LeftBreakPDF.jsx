"use client";
import React, { useEffect, useRef } from "react";

export default function LeftBreakPDF({ file }) {
  const maxPagesInputRef = useRef(null);

  useEffect(() => {
    file.breakPDFIncludeLastPages = true;
    file.breakPDFMaxPages = 1;
  }, []);

  const onMaxPagesInputChange = () => {
    let val = parseInt(maxPagesInputRef.current.value);
    if (val < 1) {
      val = 1;
      maxPagesInputRef.current.value = 1;
    }
    if (val > file.pageCount) {
      val = file.pageCount;
      maxPagesInputRef.current.value = file.pageCount;
    }
    file.breakPDFMaxPages = val;
  };

  const onIncludeLastPageInputChange = (e) => {
    file.breakPDFIncludeLastPages = e.target.checked;
  };

  return (
    <>
      <div className="flex place-items-center mt-2">
        <span className="w-1/2">Max Pages in A File</span>
        <input
          ref={maxPagesInputRef}
          className="w-1/2 py-1 text-center caret-transparent rounded-md bg-[#FFFFFF42] text-white border border-[#E9B4BF80]"
          type="number"
          defaultValue="1"
          min="1"
          max={file.pageCount}
          onChange={onMaxPagesInputChange}
        />
      </div>
      <div className="flex place-items-center mt-2">
        <span className="w-1/2">Include Last Pages</span>
        <input
          type="checkbox"
          onChange={onIncludeLastPageInputChange}
          defaultChecked={true}
        />
      </div>
    </>
  );
}
