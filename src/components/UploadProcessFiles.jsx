"use client";
import React, { useState } from "react";
import FileUploader from "./FileUploader";
import pdftoolsconfig from "@/lib/pdftoolsconfig";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import AddFilesButton from "./AddFilesButton";

export default function UploadProcessFiles({ tool }) {
  const config = pdftoolsconfig[tool];
  if (config === undefined) {
    return (
      <div className="container mt-20 text-center text-2xl font-black underline">
        Under Construction
      </div>
    );
  }
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
  const PreviewComponent = config.Preview;
  const FileExtra = config.FileExtra;
  const LeftExtra = config.LeftExtra;
  const onSortEnd = (oldIndex, newIndex) => {
    setFiles(arrayMoveImmutable(files, oldIndex, newIndex));
  };

  return (
    <div className="grid h-full grid-cols-1 overflow-y-hidden rounded-lg border-4 border-primary p-2 md:grid-cols-5">
      <div className="col-span-2 bg-primary text-white">
        <button
          onClick={() => console.log(files.filter((file) => !file.deleted))}
        >
          Save and Download
        </button>
        {config.multiple && <AddFilesButton config={config} />}
        {LeftExtra && <LeftExtra files={files} />}
      </div>

      {config.reorder ? (
        <SortableList
          onSortEnd={onSortEnd}
          className="col-span-3 grid h-full w-full grid-cols-1 gap-4 overflow-y-scroll px-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {files.map((file) => (
            <SortableItem key={file.key}>
              <div id={"file_key_" + file.key}>
                <PreviewComponent file={file} />
                {FileExtra && <FileExtra file={file} />}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        <div className="col-span-3 grid h-full w-full grid-cols-1 gap-4 overflow-y-scroll px-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {files.map((file) => (
            <div key={file.key} id={"file_key_" + file.key}>
              <PreviewComponent file={file} />
              {FileExtra && <FileExtra file={file} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
