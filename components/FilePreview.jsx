import React, { useState } from "react";
import Image from "next/image";

export default function FilePreview({ file, FilePreviewExtra }) {
  const [deleted, setDeleted] = useState(false);
  return (
    <div
      className={`flex flex-col h-full w-[200px] border-2 py-0 px-4 ${
        deleted ? "hidden" : ""
      }`}
    >
      <span className="z-40 overflow-hidden text-ellipsis cursor-default relative top-[-10px] left-[-18px] bg-yellow-200 text-gray-600 text-center text-sm">
        {file.name}
      </span>
      <div className="text-center">
        <Image width="100" height="150" src={file.image} draggable={false} />
      </div>
      {FilePreviewExtra && (
        <FilePreviewExtra file={file} setDeleted={setDeleted} />
      )}
    </div>
  );
}
