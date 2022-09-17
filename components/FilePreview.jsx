import React, { useState } from "react";

export default function FilePreview({ file, FilePreviewExtra }) {
  const [deleted, setDeleted] = useState(false);

  const fileThumbnailRef = React.createRef();
  const PDFThumbnail = React.forwardRef(({ src, deg }, ref) => (
    <div className="grid place-items-center">
      <img
        src={src}
        className="filePreviewThumbnails transition-transform"
        draggable={false}
        ref={ref}
        style={{
          transform: `rotate(${deg}deg)`,
          width: "120px",
          height: "150px",
        }}
      />
    </div>
  ));

  return (
    <div
      className={`flex flex-col h-full w-[200px] border-2 py-0 px-4 ${
        deleted ? "hidden" : ""
      }`}
    >
      <span className="z-40 overflow-hidden whitespace-nowrap text-ellipsis relative top-[-10px] left-[-18px] bg-yellow-200 text-gray-600 text-sm">
        {file.name}
      </span>
      <PDFThumbnail
        src={file.image}
        deg={file.degrees || 0}
        ref={fileThumbnailRef}
      />
      {FilePreviewExtra && (
        <FilePreviewExtra
          file={file}
          setDeleted={setDeleted}
          imageRef={fileThumbnailRef}
        />
      )}
    </div>
  );
}
