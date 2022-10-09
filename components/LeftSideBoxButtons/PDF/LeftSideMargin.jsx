import React from "react";

export default function LeftSideMargin({ margin, setMargin }) {
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

  const handleMarginValueChange = (marginIndex, unitId, textInputId) => {
    const newMargin = margin;
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

    newMargin[marginIndex] = newValueMillimeter;
    setMargin(newMargin);
  };

  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-amber-200">
      Margin Settings
      {marginSides.map((marginSide, i) => (
        <div className="mt-2 flex justify-between items-center" key={i}>
          {marginSide.text}
          <div>
            <input
              type="number"
              id={marginSide.textInputId}
              className="bg-amber-200 text-center h-[40px] rounded-l-md"
              step={0.1}
              defaultValue={0}
              onChange={() =>
                handleMarginValueChange(
                  marginSide.arrayIndex,
                  marginSide.unitId,
                  marginSide.textInputId
                )
              }
            />
            <select
              id={marginSide.unitId}
              className="bg-amber-200 h-[40px] rounded-r-md"
              onChange={() =>
                handleMarginValueChange(
                  marginSide.arrayIndex,
                  marginSide.unitId,
                  marginSide.textInputId
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
