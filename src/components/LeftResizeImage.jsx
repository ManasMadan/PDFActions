"use client";
import React from "react";

const resizeSizes = [
  "Same as Image",
  "A4",
  "A3",
  "A5",
  "Legal",
  "Letter",
  "Tabloid",
];
const orientations = ["Portrait", "Landscape"];
const positions = ["Start", "Center", "End"];

export default function LeftResizeImage() {

  return (
    <div className="w-full border-y border-white/30 py-2 tracking-wider">
      <p className="mb-2 font-medium">Page Settings</p>
      <div className="flex items-center justify-between">
        <span>Size</span>
        <select
          id="pageSize"
          className="w-1/2 rounded-md bg-white/20 py-2 pl-2"
        >
          {resizeSizes.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span>Orientation</span>
        <select
          id="pageOrientation"
          className="w-1/2 rounded-md bg-white/20 py-2 pl-2"
        >
          {orientations.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span>Image Position</span>
        <select
          id="imagePosition"
          className="w-1/2 rounded-md bg-white/20 py-2 pl-2"
        >
          {positions.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
