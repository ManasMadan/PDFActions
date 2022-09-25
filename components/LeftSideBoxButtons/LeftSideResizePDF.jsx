import React from "react";

export default function LeftSideResizePDF() {
  const resizeSizes = ["A4", "A3", "A5", "Legal", "Letter", "Tabloid"];
  const orientations = ["Portrait", "Landscape"];
  const positions = ["Start", "Center", "End"];

  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-amber-200">
      Page Settings
      <div className="flex justify-between items-center">
        Size
        <select
          id="resizeSize"
          className="bg-amber-200 w-1/2 py-2 pl-2 rounded-md"
        >
          {resizeSizes.map((resizeSize, i) => (
            <option key={i} value={resizeSize}>
              {resizeSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Orientation
        <select
          id="orientation"
          className="bg-amber-200 w-1/2 py-2 pl-2 rounded-md"
        >
          {orientations.map((orientation, i) => (
            <option key={i} value={orientation}>
              {orientation}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Position
        <select
          id="position"
          className="bg-amber-200 w-1/2 py-2 pl-2 rounded-md"
        >
          {positions.map((position, i) => (
            <option key={i} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
