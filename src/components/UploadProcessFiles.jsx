"use client";
import React, { useState } from "react";
import FileUploader from "./FileUploader";

export default function UploadProcessFiles({ lang }) {
  const [files, setFiles] = useState(null);
  return (
    <section className="container">
      {!files && <FileUploader lang={lang} setFiles={setFiles} />}
      {files && <div>Manas</div>}
    </section>
  );
}
