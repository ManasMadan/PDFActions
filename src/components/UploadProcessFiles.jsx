"use client";
import React, { useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import pdftoolsconfig from "@/lib/pdftoolsconfig";

export default function UploadProcessFiles({ tool }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!files.length) return;
    console.log(files);
  }, [files]);

  return (
    <section className="container mt-20 h-[600px]">
      {files.length === 0 && (
        <FileUploader setFiles={setFiles} {...pdftoolsconfig[tool]} />
      )}
      {files.length !== 0 && (
        <div className="h-full rounded-lg border-4 border-primary p-1">
          {files.map((file) => (
            <p key={file.name}>{file.name}</p>
          ))}
        </div>
      )}
    </section>
  );
}
