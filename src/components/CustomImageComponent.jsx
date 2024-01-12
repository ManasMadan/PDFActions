"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

function CustomImageComponent({ file }) {
  const ref = useRef(null);
  useEffect(() => {
    if (file.loadedPreview) return;
    async function func() {
      ref.current.src = await file.preview();
      ref.current.width = 150;
      ref.current.height = 150;
      file.loadedPreview = true;
      file.imageRef = ref;
    }
    func();
  }, []);
  return (
    <div className="mx-auto grid aspect-square w-[150px] place-items-center overflow-hidden">
      <Image
        onDragStart={() => false}
        ref={ref}
        src="/icons/puff_loader.svg"
        className="pointer-events-none transition-[rotate]"
        width={100}
        height={100}
        alt={file.name}
      />
    </div>
  );
}

export default CustomImageComponent;
