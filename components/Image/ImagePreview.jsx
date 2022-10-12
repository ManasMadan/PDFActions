import React, { useState } from "react";

export default function ImagePreview({ image, ImagePreviewExtra }) {
  const [deleted, setDeleted] = useState(false);

  const imageThumbnailRef = React.createRef();
  const ImageThumbnail = React.forwardRef(({ src, deg }, ref) => {
    let TYPED_ARRAY = new Uint8Array(src);
    let STRING_CHAR;
    try {
      STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    } catch (e) {
      STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, "");
    }

    let base64String = btoa(STRING_CHAR);

    const imageSRC = `data:image/jpg;base64, ${base64String}`;

    return (
      <div className="grid place-items-center">
        <img
          src={imageSRC}
          className="imagePreviewThumbnails transition-transform"
          draggable={false}
          ref={ref}
          style={{
            transform: `rotate(${deg}deg)`,
            width: "120px",
            height: "150px",
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
        {image.name}
      </span>
      <ImageThumbnail
        src={image.src}
        deg={image.degrees}
        ref={imageThumbnailRef}
      />
      {ImagePreviewExtra && (
        <ImagePreviewExtra
          image={image}
          setDeleted={setDeleted}
          imageRef={imageThumbnailRef}
        />
      )}
    </div>
  );
}
