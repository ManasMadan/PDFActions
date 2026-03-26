"use client";

import React from "react";

const selectClassName =
  "bg-white/20 w-1/2 py-2 pl-2 rounded-md text-white outline-none";

const resizeSizes = ["A4", "A3", "A5", "Legal", "Letter", "Tabloid"];
const orientations = ["Portrait", "Landscape"];
const positions = ["Start", "Center", "End"];

export default function LeftResizePDF() {
  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-white/30 text-white">
      Page Settings
      <div className="flex justify-between items-center mt-2">
        Size
        <select id="resizeSize" className={selectClassName}>
          {resizeSizes.map((s, i) => (
            <option key={i} value={s} className="text-black">
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Orientation
        <select id="orientation" className={selectClassName}>
          {orientations.map((o, i) => (
            <option key={i} value={o} className="text-black">
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Position
        <select id="position" className={selectClassName}>
          {positions.map((p, i) => (
            <option key={i} value={p} className="text-black">
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
