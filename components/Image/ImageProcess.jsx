import React, { useRef } from "react";
import LeftSideBox from "../LeftSideBox";
import ImagePreviewGrid from "./ImagePreviewGrid";

export default function ImageProcess({
  images,
  setImages,
  sortableImagePreviewGrid,
  addFileOptions,
  downloadHandler,
  LeftSideBoxExtra,
  ImagePreviewExtra,
}) {
  const inputButtonRef = useRef(null);

  const onFileChange = async (e) => {
    const temp = [];
    const newImages = e.target.files;

    for (var i = 0; i < newImages.length; i++) {
      const newImage = newImages[i];
      const imageURL = URL.createObjectURL(newImage);
      const imageBytes = await fetch(imageURL).then((res) => res.arrayBuffer());
      const imageData = {
        src: imageBytes,
        name: newImage.name,
        degrees: 0,
        deleted: false,
      };
      temp.push(imageData);
    }

    setImages([...images, ...temp]);
  };
  const handleDeleteFilesClick = () => {
    setImages([{ deleted: true }]);
  };
  const handleAddFileButtonClick = () => {
    inputButtonRef.current.click();
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hidden Input Tag for AddImage Button */}
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={inputButtonRef}
        multiple={addFileOptions.multiple}
        onChange={(e) => onFileChange(e)}
      />

      {/* Image Box */}

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

          {/* Right Side Box / Image Preview */}
          <div className="w-full md:w-2/3 p-4 border-amber-200 border-2 border-dashed">
            <ImagePreviewGrid
              images={images}
              setImages={setImages}
              ImagePreviewExtra={ImagePreviewExtra}
              sortableImagePreviewGrid={sortableImagePreviewGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
