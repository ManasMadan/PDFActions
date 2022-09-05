import React from "react";
import Image from "next/image";
import loader from "./loader.gif";

export default function FilePreview({ file, children }) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-red-100 text-center">
        <Image width="100" height="150" src={loader} draggable={false} />
      </div>
      <span>{file.name}</span>
    </div>
  );
}
