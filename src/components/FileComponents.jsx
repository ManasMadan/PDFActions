import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const IconButton = ({ iconPath, onClick, className, altText }) => {
  return (
    <button
      className={cn("rounded-md bg-primary px-4 py-2", className)}
      onClick={onClick}
    >
      <Image src={iconPath} width={16} height={16} alt={altText} />
    </button>
  );
};

export function FileRotate({ file }) {
  return (
    <div className="my-2 flex justify-evenly gap-4">
      <IconButton
        onClick={() => {
          file.rotate = file.rotate - 90;
          file.imageRef.current.style.rotate = `${file.rotate}deg`;
        }}
        iconPath="/icons/modifiers/rotate-left.png"
        altText="Rotate Left Icon"
      />

      <IconButton
        onClick={() => {
          file.rotate = file.rotate + 90;
          file.imageRef.current.style.rotate = `${file.rotate}deg`;
        }}
        iconPath="/icons/modifiers/rotate-right.png"
        altText="Rotate Right Icon"
      />
    </div>
  );
}

export function FileDelete({ file }) {
  return (
    <div className="mx-4">
      <IconButton
        className="flex w-full justify-evenly"
        onClick={() => {
          file.deleted = true;
          document.getElementById(`file_key_${file.key}`).remove();
        }}
        iconPath="/icons/modifiers/delete.png"
        altText="Delete Icon"
      />
    </div>
  );
}
