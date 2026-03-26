"use client";
import React from "react";

const inputClassName =
  "bg-white/20 w-20 py-1 text-center rounded-md text-white outline-none";

export default function LeftWatermark() {
  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-white/30 text-white">
      Watermark Settings
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center">
          <span>Text</span>
          <input
            id="watermarkText"
            type="text"
            defaultValue="WATERMARK"
            className="bg-white/20 w-1/2 py-1 pl-2 rounded-md text-white outline-none text-sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Font Size</span>
          <input
            id="watermarkFontSize"
            type="number"
            defaultValue="40"
            min="8"
            max="200"
            className={inputClassName}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Opacity</span>
          <input
            id="watermarkOpacity"
            type="range"
            defaultValue="0.3"
            min="0.05"
            max="1"
            step="0.05"
            className="w-1/2"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Rotation</span>
          <input
            id="watermarkRotation"
            type="number"
            defaultValue="-45"
            min="-180"
            max="180"
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  );
}
