import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDictionary } from "../lib/DictionaryProviderClient";
import styles from "@/styles/fileuploader.module.css";

export default function FileUploader({ setFiles, dropZoneProps, onDropFiles }) {
  const { file_uploader } = useDictionary();
  const [preprocessingFiles, setPreprocessingFiles] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setPreprocessingFiles(true);
    const files = await onDropFiles(acceptedFiles);
    setFiles(files);
    setPreprocessingFiles(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...dropZoneProps,
  });

  return (
    <div className="h-full cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={cn(
          "grid h-full place-items-center rounded-xl border-4 border-dotted border-primary p-1",
          { "bg-primary": isDragActive },
          { "bg-[#E9B4BF42]": !isDragActive },
          preprocessingFiles && styles["wrapper"],
        )}
      >
        <div
          className={cn("flex flex-col items-center justify-center gap-4", {
            hidden: isDragActive,
          })}
        >
          <Image
            src="/icons/file_uploader.png"
            width={64}
            height={64}
            alt="File Upload Icon"
          />
          <div className="text-center text-[#00000080]">
            <p>{file_uploader.drop_files}</p>
            <p>{file_uploader.or}</p>
          </div>
          <div className="rounded-xl bg-primary px-8 py-2 text-white">
            {file_uploader.browse}
          </div>
        </div>
        <div
          className={cn(
            "grid h-full w-full place-items-center rounded-lg border-4 border-white text-2xl text-white",
            {
              hidden: !isDragActive,
            },
          )}
        >
          {file_uploader.release}
        </div>
      </div>
    </div>
  );
}
