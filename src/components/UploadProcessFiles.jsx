"use client";
import React, { useCallback, useState } from "react";
import FileUploader from "./FileUploader";
import pdftoolsconfig from "@/lib/pdftoolsconfig";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import GlassButton from "./GlassButton";
import { useDropzone } from "react-dropzone";

export default function UploadProcessFiles({ tool }) {
  const config = pdftoolsconfig[tool];
  const [files, setFiles] = useState([]);

  return (
    <section className="container mt-20 h-[600px]">
      {files.length === 0 ? (
        <FileUploader setFiles={setFiles} {...config} />
      ) : (
        <ProcessFile config={config} files={files} setFiles={setFiles} />
      )}
    </section>
  );
}

const ProcessFile = ({ files, setFiles, config }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = await config.preProcessFiles(acceptedFiles, files.length);
    setFiles((files) => files.concat(newFiles));
  }, []);
  const { getInputProps, open } = useDropzone({
    onDrop,
    ...config.dropZoneProps,
    noDrag: true,
    noClick: true,
    noKeyboard: true,
  });

  const PreviewComponent = config.Preview;
  const FileExtra = config.FileExtra;
  const LeftExtra = config.LeftExtra;
  const onSortEnd = (oldIndex, newIndex) => {
    setFiles(arrayMoveImmutable(files, oldIndex, newIndex));
  };

  const File = ({ file }) => (
    <div className="rounded-lg bg-white p-2">
      <PreviewComponent file={file} />
      {FileExtra && <FileExtra file={file} />}
    </div>
  );

  return (
    <div className="grid h-full grid-cols-1 overflow-y-hidden rounded-lg border-4 border-primary md:grid-cols-5">
      <input {...getInputProps()} />

      <div className="col-span-2 flex flex-col gap-4 overflow-scroll bg-primary p-2 text-white">
        <GlassButton
          onClick={() =>
            config.processor(files.filter((file) => !file.deleted))
          }
        >
          Save and Download
        </GlassButton>
        {config.multiple && <GlassButton onClick={open}>Add Files</GlassButton>}
        <div className="grow overflow-y-scroll">
          {LeftExtra && <LeftExtra files={files} />}
        </div>
        <GlassButton onClick={() => setFiles([])}>Delete Files</GlassButton>
      </div>

      {config.reorder ? (
        <SortableList
          onSortEnd={onSortEnd}
          className="col-span-3 grid h-full w-full grid-cols-1 gap-4 overflow-y-scroll bg-[#E9B4BF4D] p-2 px-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {files.map((file) => (
            <SortableItem key={file.key}>
              <div id={"file_key_" + file.key}>
                <File file={file} />
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        <div className="col-span-3 grid h-full w-full grid-cols-1 gap-4 overflow-y-scroll bg-[#E9B4BF4D] p-2 px-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {files.map((file) => (
            <div key={file.key} id={"file_key_" + file.key}>
              <File file={file} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
