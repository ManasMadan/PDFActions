"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/CustomImageComponent.module.css";
import { cn } from "@/lib/utils";

function CustomImageComponent({ file }) {
  const ref = useRef(null);
  useEffect(() => {
    if (file.imageData) {
      ref.current.src = file.imageData;
      ref.current.width = 150;
      ref.current.height = 150;
      file.imageRef = ref;
      return;
    }
    async function func() {
      const res = await file.preview();
      file.imageData = res;
      ref.current.src = res;
      ref.current.width = 150;
      ref.current.height = 150;
      file.imageRef = ref;
    }
    func();
    console.log(file);
  }, []);
  return (
    <div className="relative mx-auto grid aspect-square w-[150px] place-items-center">
      <Image
        className={cn("absolute right-0 top-0", styles.info_icon)}
        src="/icons/common/info.png"
        width={16}
        height={16}
        alt="file_info"
      />
      <ul
        className={cn(
          "absolute right-0 top-0 w-[150px] rounded-md bg-primary p-2 text-xs text-white",
          styles["info_container"],
        )}
      >
        <li className="line-clamp-2">Name : {file.name}</li>
        <li className="line-clamp-2">Size : {file.size}</li>
        <li className="line-clamp-2">
          Last Modified : {file.lastModifiedDate.toString()}
        </li>
        <li className="line-clamp-2">File Type : {file.type}</li>
      </ul>
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
