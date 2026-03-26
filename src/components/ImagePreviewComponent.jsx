"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/CustomImageComponent.module.css";
import { cn } from "@/lib/utils";

function ImagePreviewComponent({ file }) {
  const ref = useRef(null);

  useEffect(() => {
    if (file.imageDataURL) {
      ref.current.src = file.imageDataURL;
      ref.current.width = 150;
      ref.current.height = 150;
      file.imageRef = ref;
      ref.current.style.rotate = `${file.rotate}deg`;
      return;
    }
    const url = URL.createObjectURL(file);
    file.imageDataURL = url;
    ref.current.src = url;
    ref.current.width = 150;
    ref.current.height = 150;
    file.imageRef = ref;
    ref.current.style.rotate = `${file.rotate}deg`;
  }, []);

  return (
    <div className="relative mx-auto grid aspect-square w-[150px] place-items-center">
      <Image
        className={cn("absolute right-0 top-0 z-40", styles.info_icon)}
        src="/icons/common/info.png"
        width={16}
        height={16}
        alt="file_info"
      />
      <ul
        className={cn(
          "absolute right-0 top-0 z-50 w-[150px] rounded-md bg-primary p-2 text-xs text-white",
          styles["info_container"],
        )}
      >
        <li className="line-clamp-2">Name : {file.name}</li>
        <li className="line-clamp-2">Size : {file.size}</li>
        <li className="line-clamp-2">File Type : {file.type}</li>
      </ul>
      <Image
        onDragStart={() => false}
        ref={ref}
        src="/icons/puff_loader.svg"
        className="pointer-events-none z-30 object-contain transition-[rotate]"
        width={100}
        height={100}
        alt={file.name}
      />
    </div>
  );
}

export default ImagePreviewComponent;
