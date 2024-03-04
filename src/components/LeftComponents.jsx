import React from "react";
import GlassButton from "./GlassButton";
import Image from "next/image";

export function LeftRotate({ files }) {
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
          Rotate Left
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
          Rotate Right
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
        Reset Rotation
      </GlassButton>
    </div>
  );
}
