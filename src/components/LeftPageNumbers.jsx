"use client";
import React, { useEffect } from "react";

export default function LeftPageNumbers({ file }) {
  useEffect(() => {
    file.firstPageNumber = 1;
    file.startingPage = 1;
    file.endingPage = file.pageCount;
    file.margin = "Recommended";
    file.pageNumberPosition = "b-c";
    file.pageNumberFontSize = 12;
  }, []);

  const clampAndSet = (e, prop, min, max) => {
    let num = parseInt(e.target.value);
    if (num < min) {
      num = min;
      e.target.value = min;
    }
    if (max !== undefined && num > max) {
      num = max;
      e.target.value = max;
    }
    file[prop] = num;
  };

  return (
    <div className="w-full border-y-2 border-[#E9B4BF80] py-2 tracking-wider">
      Page Number Options
      <div className="mt-2 flex items-center justify-between">
        Position
        <div className="grid grid-cols-3 border-2 border-[#E9B4BF80]">
          <div className="flex h-[30px] w-[30px] items-center justify-center border-b-2 border-r-2 border-dotted border-[#E9B4BF80]">
            <input
              type="radio"
              name="position"
              value="t-l"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center border-b-2 border-r-2 border-dotted border-[#E9B4BF80]">
            <input
              type="radio"
              name="position"
              value="t-c"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center border-b-2 border-dotted border-[#E9B4BF80]">
            <input
              type="radio"
              name="position"
              value="t-r"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
          <div className="h-[30px] w-[30px] border-b-2 border-r-2 border-dotted border-[#E9B4BF80]"></div>
          <div className="h-[30px] w-[30px] border-b-2 border-r-2 border-dotted border-[#E9B4BF80]"></div>
          <div className="h-[30px] w-[30px] border-b-2 border-dotted border-[#E9B4BF80]"></div>
          <div className="flex h-[30px] w-[30px] items-center justify-center border-r-2 border-dotted border-[#E9B4BF80]">
            <input
              type="radio"
              name="position"
              value="b-l"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center border-r-2 border-dotted border-[#E9B4BF80]">
            <input
              type="radio"
              name="position"
              defaultChecked={true}
              value="b-c"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center">
            <input
              type="radio"
              name="position"
              value="b-r"
              onChange={(e) => { file.pageNumberPosition = e.target.value; }}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        Margin
        <select
          id="margin"
          className="w-1/2 rounded-md bg-[#E9B4BF80] py-2 pl-2 text-white"
          defaultValue="Recommended"
          onChange={(e) => { file.margin = e.target.value; }}
        >
          <option value="Small">Small</option>
          <option value="Recommended">Recommended</option>
          <option value="Big">Big</option>
        </select>
      </div>
      <div className="mt-2 flex items-center justify-between">
        Starting Page
        <input
          className="w-[50px] rounded-md bg-[#E9B4BF80] text-center caret-transparent"
          type="number"
          defaultValue="1"
          min="1"
          max={file.pageCount}
          onChange={(e) => clampAndSet(e, "startingPage", 1, file.pageCount)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        Ending Page
        <input
          className="w-[50px] rounded-md bg-[#E9B4BF80] text-center caret-transparent"
          type="number"
          defaultValue={file.pageCount}
          min="1"
          max={file.pageCount}
          onChange={(e) => clampAndSet(e, "endingPage", 1, file.pageCount)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        First Number
        <input
          className="w-[50px] rounded-md bg-[#E9B4BF80] text-center caret-transparent"
          type="number"
          defaultValue="1"
          min="1"
          onChange={(e) => clampAndSet(e, "firstPageNumber", 1)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        Font Size
        <input
          className="w-[50px] rounded-md bg-[#E9B4BF80] text-center caret-transparent"
          type="number"
          defaultValue="12"
          min="1"
          onChange={(e) => clampAndSet(e, "pageNumberFontSize", 1)}
        />
      </div>
    </div>
  );
}
