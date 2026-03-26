"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

function PagePreviewComponent({ file }) {
  const ref = useRef(null);

  useEffect(() => {
    if (file.imageData) {
      ref.current.src = file.imageData;
      ref.current.width = 150;
      ref.current.height = 150;
      file.imageRef = ref;
      ref.current.style.rotate = `${file.rotate}deg`;
    }
  }, []);

  return (
    <div className="relative mx-auto grid aspect-square w-[150px] place-items-center">
      <p className="absolute bottom-0 z-40 w-full rounded-b-md bg-primary px-2 py-1 text-center text-xs text-white">
        {file.name}
      </p>
      <Image
        onDragStart={() => false}
        ref={ref}
        src="/icons/puff_loader.svg"
        className="pointer-events-none z-30 transition-[rotate]"
        width={100}
        height={100}
        alt={file.name}
      />
    </div>
  );
}

export default PagePreviewComponent;
