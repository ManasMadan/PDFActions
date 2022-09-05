import React from "react";
import Image from "next/image";

export default function FilePreview({ file, children }) {
  return (
    <div className="flex flex-col h-full w-full bg-red-100">
      <div className="text-center">
        <Image width="100" height="150" src={file.image} draggable={false} />
      </div>
      <span>{file.name}</span>
    </div>
  );
}
