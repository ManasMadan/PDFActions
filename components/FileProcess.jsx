import React, { useRef } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import imageDataURLFromFile from "../methods/imageDataURLfromFile";

export default function FileProcess({
  bannerText,
  bannerDescription,
  addFileOptions,
  files,
  downloadHandler,
  LeftSideBox,
  LeftSideBoxExtra,
  FilePreview,
  FilePreviewExtra,
}) {
  const addFileButtonRef = useRef(null);

  const onFileChange = (e) =>
    addFileOptions.setFiles([...files, ...e.target.files]);

  const onSortEnd = (oldIndex, newIndex) =>
    addFileOptions.setFiles(arrayMove(files, oldIndex, newIndex));

  return (
    <div className="overflow-x-hidden">
      {/* Hidden Input Tag for AddFile Button */}
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={addFileButtonRef}
        multiple={addFileOptions.multiple}
        onChange={(e) => onFileChange(e)}
      />

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          {bannerText}
        </div>
        <div>{bannerDescription}</div>
      </div>

      <div className="px-12 py-6 md:px-24 md:py-12 flex flex-col items-center md:items-start">
        <button
          className="md:w-1/3 w-full bg-amber-200 px-8 py-4 rounded-sm text-xl"
          onClick={downloadHandler}
        >
          Save And Download
        </button>
        <div className="flex flex-col md:flex-row w-full justify-between mt-6">
          {/* Left Side Box */}
          <LeftSideBox addFileButtonRef={addFileButtonRef}>
            {LeftSideBoxExtra && <LeftSideBoxExtra />}
          </LeftSideBox>

          {/* Right Side Box = File Preview */}

          <div className="w-full md:w-2/3 p-4 border-amber-200 border-2 border-dashed">
            <SortableList
              onSortEnd={onSortEnd}
              className=""
              draggedItemClassName="opacity-50"
            >
              {files.map((file, i) => (
                <SortableItem key={i}>
                  <div className="cursor-grab select-none">
                    <FilePreview file={file}>
                      {FilePreviewExtra && <FilePreviewExtra />}
                    </FilePreview>
                  </div>
                </SortableItem>
              ))}
            </SortableList>
          </div>
        </div>
      </div>
    </div>
  );
}
