import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function FileRotateButtons({ file, imageRef }) {
  const rotateFileLeftHandler = () => {
    const degrees = file.degrees - 90 || -90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    file.degrees = degrees;
  };
  const rotateFileRightHandler = () => {
    const degrees = file.degrees + 90 || 90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    file.degrees = degrees;
  };

  return (
    <div className="flex items-center justify-evenly w-full">
      <button
        className="px-4 py-2 rounded-md bg-amber-200"
        onClick={rotateFileLeftHandler}
      >
        <RotateLeft />
      </button>
      <button
        className="px-4 py-2 rounded-md bg-amber-200"
        onClick={rotateFileRightHandler}
      >
        <RotateRight />
      </button>
    </div>
  );
}
