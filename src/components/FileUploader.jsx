// import { getDictionary } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDictionary } from "../lib/DictionaryProviderClient";

export default function FileUploader({ setFiles, lang }) {
  const { file_uploader } = useDictionary();
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="mt-20 cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={cn(
          "grid h-[600px] place-items-center rounded-xl border-4 border-dotted border-primary p-1",
          { "bg-primary": isDragActive },
          { "bg-[#E9B4BF42]": !isDragActive },
        )}
      >
        <div
          className={cn("flex flex-col items-center justify-center gap-4", {
            hidden: isDragActive,
          })}
        >
          <Image src="/icons/file_uploader.png" width={64} height={64} />
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
