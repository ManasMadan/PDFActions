"use client";

import React, { useEffect } from "react";

const fieldClassName =
  "bg-white/20 w-full py-2 pl-2 rounded-md text-white outline-none";

const units = ["Inches", "Centimeters", "Millimeters"];
const marginSides = [
  {
    text: "Left",
    arrayIndex: 0,
    unitId: "marginLeftUnit",
    textInputId: "marginLeftValue",
  },
  {
    text: "Top",
    arrayIndex: 1,
    unitId: "marginTopUnit",
    textInputId: "marginTopValue",
  },
  {
    text: "Right",
    arrayIndex: 2,
    unitId: "marginRightUnit",
    textInputId: "marginRightValue",
  },
  {
    text: "Bottom",
    arrayIndex: 3,
    unitId: "marginBottomUnit",
    textInputId: "marginBottomValue",
  },
];

export default function LeftMargin({ files }) {
  useEffect(() => {
    if (files[0]) {
      files[0].marginMillimeter = [0, 0, 0, 0];
    }
  }, []);

  const handleMarginValueChange = (marginIndex, unitId, textInputId) => {
    const unit = document.getElementById(unitId).value;
    const newValue = document.getElementById(textInputId).value;
    const newValueFloat = newValue === "" ? 0 : parseFloat(newValue);
    let newValueMillimeter = newValueFloat;
    if (unit === "Inches") {
      newValueMillimeter =
        Math.round((25.4 * newValueFloat + Number.EPSILON) * 100) / 100;
    } else if (unit === "Centimeters") {
      newValueMillimeter =
        Math.round((10 * newValueFloat + Number.EPSILON) * 100) / 100;
    }
    if (files[0]) {
      if (!files[0].marginMillimeter) {
        files[0].marginMillimeter = [0, 0, 0, 0];
      }
      files[0].marginMillimeter[marginIndex] = newValueMillimeter;
    }
  };

  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-white/30 text-white">
      Margin Settings
      {marginSides.map((side) => (
        <div key={side.arrayIndex} className="flex items-center gap-2 mt-2">
          <span className="w-16 shrink-0">{side.text}</span>
          <input
            id={side.textInputId}
            type="number"
            defaultValue={0}
            min={0}
            className={fieldClassName}
            onChange={() =>
              handleMarginValueChange(
                side.arrayIndex,
                side.unitId,
                side.textInputId,
              )
            }
          />
          <select
            id={side.unitId}
            className={fieldClassName}
            onChange={() =>
              handleMarginValueChange(
                side.arrayIndex,
                side.unitId,
                side.textInputId,
              )
            }
          >
            {units.map((u, i) => (
              <option key={i} value={u} className="text-black">
                {u}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
