"use client";
import React, { useRef, useEffect } from "react";

function HTMLPreviewComponent({ file }) {
  const ref = useRef(null);

  useEffect(() => {
    file.imageRef = ref;
  }, []);

  return (
    <div
      className="relative mx-auto grid aspect-square w-[150px] place-items-center"
      ref={ref}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-primary/20 p-4">
        <span className="text-2xl">&lt;/&gt;</span>
        <span className="line-clamp-2 break-all text-center text-xs">
          {file.name}
        </span>
        <span className="text-xs opacity-70">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      </div>
    </div>
  );
}

export default HTMLPreviewComponent;
