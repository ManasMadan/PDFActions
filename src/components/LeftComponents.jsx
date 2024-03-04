import React from "react";
import GlassButton from "./GlassButton";
import Image from "next/image";
import { useDictionary } from "@/lib/DictionaryProviderClient";

export function LeftRotate({ files }) {
  const { pdf_tools } = useDictionary();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <GlassButton
          onClick={() => {
            files.forEach((file) => {
              file.rotate = file.rotate - 90;
              file.imageRef.current.style.rotate = `${file.rotate}deg`;
            });
          }}
          className="flex items-center justify-center gap-2"
        >
          <Image
            src="/icons/modifiers/rotate-left.png"
            width={16}
            height={16}
            alt="Rotate Left Icon"
          />
          {pdf_tools.extra.left.rotate.left}
        </GlassButton>
        <GlassButton
          onClick={() => {
            files.forEach((file) => {
              file.rotate = file.rotate + 90;
              file.imageRef.current.style.rotate = `${file.rotate}deg`;
            });
          }}
          className="flex items-center justify-center gap-2"
        >
          <Image
            src="/icons/modifiers/rotate-right.png"
            width={16}
            height={16}
            alt="Rotate Right Icon"
          />
          {pdf_tools.extra.left.rotate.right}
        </GlassButton>
      </div>
      <GlassButton
        onClick={() => {
          files.forEach((file) => {
            file.rotate = 0;
            file.imageRef.current.style.rotate = `${file.rotate}deg`;
          });
        }}
      >
        {pdf_tools.extra.left.rotate.reset}
      </GlassButton>
    </div>
  );
}
