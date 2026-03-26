"use client";
import React, { useEffect } from "react";

const units = ["Inches", "Centimeters", "Millimeters"];
const marginSides = [
  {
    text: "Left",
    arrayIndex: 0,
    unitId: "imgMarginLeftUnit",
    textInputId: "imgMarginLeftValue",
  },
  {
    text: "Top",
    arrayIndex: 1,
    unitId: "imgMarginTopUnit",
    textInputId: "imgMarginTopValue",
  },
  {
    text: "Right",
    arrayIndex: 2,
    unitId: "imgMarginRightUnit",
    textInputId: "imgMarginRightValue",
  },
  {
    text: "Bottom",
    arrayIndex: 3,
    unitId: "imgMarginBottomUnit",
    textInputId: "imgMarginBottomValue",
  },
];

export default function LeftImageMargin({ files }) {
  useEffect(() => {
    if (files[0]) files[0].marginMillimeter = [0, 0, 0, 0];
  }, []);

  const handleMarginValueChange = (marginIndex, unitId, textInputId) => {
    const unit = document.getElementById(unitId).value;
    const newValue = document.getElementById(textInputId).value;
    const newValueFloat = newValue === "" ? 0 : parseFloat(newValue);
    let newValueMillimeter = newValueFloat;
    if (unit === "Inches")
      newValueMillimeter =
        Math.round((25.4 * newValueFloat + Number.EPSILON) * 100) / 100;
    else if (unit === "Centimeters")
      newValueMillimeter =
        Math.round((10 * newValueFloat + Number.EPSILON) * 100) / 100;
    if (files[0]) {
      if (!files[0].marginMillimeter) files[0].marginMillimeter = [0, 0, 0, 0];
      files[0].marginMillimeter[marginIndex] = newValueMillimeter;
    }
  };

  return (
    <div className="w-full border-y border-white/30 py-2 tracking-wider">
      <p className="mb-2 font-medium">Margin Settings</p>
      {marginSides.map((marginSide, i) => (
        <div className="mt-2 flex items-center justify-between" key={i}>
          <span>{marginSide.text}</span>
          <div className="flex">
            <input
              type="number"
              id={marginSide.textInputId}
              className="h-[36px] w-16 rounded-l-md bg-white/20 text-center"
              step={0.1}
              defaultValue={0}
              onChange={() =>
                handleMarginValueChange(
                  marginSide.arrayIndex,
                  marginSide.unitId,
                  marginSide.textInputId,
                )
              }
            />
            <select
              id={marginSide.unitId}
              className="h-[36px] rounded-r-md bg-white/20 text-xs"
              onChange={() =>
                handleMarginValueChange(
                  marginSide.arrayIndex,
                  marginSide.unitId,
                  marginSide.textInputId,
                )
              }
            >
              {units.map((unit, i) => (
                <option key={i} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
