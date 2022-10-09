import React, { useEffect, useRef } from "react";

export default function FileRangeInput({ file }) {
  const splitRangeStartRef = useRef(null);
  const splitRangeEndRef = useRef(null);

  const min = (a, b) => (a < b ? a : b);

  useEffect(() => {
    file.splitRange = [1, file.pageCount];
  }, []);

  const onSplitRangeChange = () => {
    let start = parseInt(splitRangeStartRef.current.value);
    let end = parseInt(splitRangeEndRef.current.value);
    if (start < 1) {
      start = 1;
      splitRangeStartRef.current.value = 1;
    }
    if (end < 1) {
      end = 1;
      splitRangeEndRef.current.value = 1;
    }
    if (end > file.pageCount) {
      end = file.pageCount;
      splitRangeEndRef.current.value = file.pageCount;
    }
    if (start > file.pageCount) {
      start = file.pageCount;
      splitRangeStartRef.current.value = file.pageCount;
    }
    file.splitRange = [start, end];
    splitRangeStartRef.current.max = min(file.pageCount, end);
  };

  return (
    <div className="flex items-center justify-center w-[122px] rounded-md bg-amber-200">
      <input
        ref={splitRangeStartRef}
        className="w-[50px] text-center caret-transparent bg-amber-200"
        type="number"
        defaultValue="1"
        min="1"
        max={file.pageCount}
        onChange={onSplitRangeChange}
      />
      <div className="text-sm">to</div>
      <input
        ref={splitRangeEndRef}
        className="w-[50px] text-center caret-transparent bg-amber-200"
        type="number"
        defaultValue={file.pageCount}
        min="1"
        max={file.pageCount}
        onChange={onSplitRangeChange}
      />
    </div>
  );
}
