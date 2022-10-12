import React, { useState, useEffect } from "react";
import imageDataURLfromFile from "../../methods/imageDataURLfromFile";
import styles from "../../styles/PDFFilePreview.module.css";
export default function FilePreview({ file, FilePreviewExtra }) {
  const [deleted, setDeleted] = useState(false);

  const fileThumbnailRef = React.createRef();
  const PDFThumbnail = React.forwardRef(({ src, deg }, ref) => {
    useEffect(async () => {
      if (src.image) {
        ref.current.classList.remove(styles.rotating);
        ref.current.src = src.image;
        return;
      }
      const data = await imageDataURLfromFile(src, 1);
      ref.current.src = data;
      ref.current.classList.remove(styles.rotating);
      src.image = data;
    }, []);

    return (
      <div className="grid place-items-center">
        <img
          src="data:image/png;base64,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"
          className={`${styles.rotating} filePreviewThumbnails transition-transform`}
          draggable={false}
          ref={ref}
          style={{
            transform: `rotate(${deg}deg)`,
            width: "120px",
            height: "150px",
            zIndex: -1,
          }}
        />
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col h-full w-[200px] border-2 py-0 px-4 ${
        deleted ? "hidden" : ""
      }`}
    >
      <span className="z-40 overflow-hidden whitespace-nowrap text-ellipsis relative top-[-10px] left-[-18px] bg-yellow-200 text-gray-600 text-sm">
        {file.name}
      </span>
      <PDFThumbnail src={file} deg={file.degrees || 0} ref={fileThumbnailRef} />
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
