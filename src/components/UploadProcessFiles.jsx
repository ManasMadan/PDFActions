"use client";
import React, { useState } from "react";
import FileUploader from "./FileUploader";
import pdftoolsconfig from "@/lib/pdftoolsconfig";

export default function UploadProcessFiles({ tool }) {
  const [files, setFiles] = useState([]);
  const PreviewComponent = pdftoolsconfig[tool].Preview;
  const FileExtra = pdftoolsconfig[tool].FileExtra;
  const LeftExtra = pdftoolsconfig[tool].LeftExtra;

  return (
    <section className="container mt-20 h-[600px]">
      {files.length === 0 && (
        <FileUploader setFiles={setFiles} {...pdftoolsconfig[tool]} />
      )}
      {files.length !== 0 && (
        <div className="grid h-full grid-cols-1 overflow-y-scroll rounded-lg border-4 border-primary p-2 md:grid-cols-5">
          <div className="col-span-2 bg-primary text-white">
            {LeftExtra && <LeftExtra />}
          </div>
          <div className="col-span-3 grid h-fit w-fit grid-cols-1 gap-4 px-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex h-fit w-full flex-col border-2"
              >
                <PreviewComponent file={file} />
                {FileExtra && <FileExtra file={file} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
