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

    if (start > end) {
      start = end;
      splitRangeStartRef.current.value = end;
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
        onKeyDown={(e) => e.preventDefault()}
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
        onKeyDown={(e) => e.preventDefault()}
        onChange={onSplitRangeChange}
      />
    </div>
  );
}
