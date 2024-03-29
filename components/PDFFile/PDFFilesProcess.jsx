import React, { useRef } from "react";
import LeftSideBox from "../LeftSideBox";
import FilePreviewGrid from "./FilePreviewGrid";
import getPDFPageCount from "../../methods/getPDFPageCount";
export default function PDFFilesProcess({
  files,
  setFiles,
  sortableFilePreviewGrid,
  addFileOptions,
  downloadHandler,
  LeftSideBoxExtra,
  FilePreviewExtra,
}) {
  const inputButtonRef = useRef(null);

  const handleDeleteFilesClick = () => {
    setFiles([{ deleted: true }]);
  };
  const handleAddFileButtonClick = () => {
    inputButtonRef.current.click();
  };

  const onFileChange = async (e) => {
    const temp = [];
    const newFiles = e.target.files;

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      file.pageCount = await getPDFPageCount(file);
      temp.push(file);
    }

    setFiles([...files, ...temp]);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hidden Input Tag for AddFile Button */}
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={inputButtonRef}
        multiple={addFileOptions.multiple}
        onChange={(e) => onFileChange(e)}
      />

      {/* PDF Box */}

      <div className="px-4 py-6 md:px-24 md:py-12 flex flex-col items-center md:items-start">
        {/* Download Button */}
        <button
          className="md:w-1/3 w-full bg-amber-200 px-8 py-4 rounded-sm text-xl"
          onClick={downloadHandler}
        >
          Save And Download
        </button>

        {/* Box Below Download Button */}
        <div className="flex flex-col md:flex-row w-full justify-between mt-6">
          {/* Left Side Box */}
          <LeftSideBox
            handleAddFileButtonClick={handleAddFileButtonClick}
            handleDeleteFilesClick={handleDeleteFilesClick}
            multiple={addFileOptions.multiple}
          >
            {LeftSideBoxExtra && <LeftSideBoxExtra />}
          </LeftSideBox>

          {/* Right Side Box / File Preview */}
          <div className="w-full md:w-2/3 p-4 border-amber-200 border-2 border-dashed">
            <FilePreviewGrid
              files={files}
              setFiles={setFiles}
              FilePreviewExtra={FilePreviewExtra}
              sortableFilePreviewGrid={sortableFilePreviewGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
