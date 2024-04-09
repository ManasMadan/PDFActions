"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const IconButton = ({ iconPath, onClick, className, altText }) => {
  return (
    <button
      className={cn("rounded-md bg-primary px-4 py-2", className)}
      onClick={onClick}
    >
      <Image src={iconPath} width={16} height={16} alt={altText} />
    </button>
  );
};

export function FileRotate({ file }) {
  return (
    <div className="my-2 flex w-full justify-between gap-4">
      <IconButton
        onClick={() => {
          file.rotate = file.rotate - 90;
          file.imageRef.current.style.rotate = `${file.rotate}deg`;
        }}
        iconPath="/icons/modifiers/rotate-left.png"
        altText="Rotate Left Icon"
      />

      <IconButton
        onClick={() => {
          file.rotate = file.rotate + 90;
          file.imageRef.current.style.rotate = `${file.rotate}deg`;
        }}
        iconPath="/icons/modifiers/rotate-right.png"
        altText="Rotate Right Icon"
      />
    </div>
  );
}

export function FileDelete({ file }) {
  return (
    <IconButton
      className="flex w-full justify-evenly"
      onClick={() => {
        file.deleted = true;
        document.getElementById(`file_key_${file.key}`).remove();
      }}
      iconPath="/icons/modifiers/delete.png"
      altText="Delete Icon"
    />
  );
}

export function FileSplit({ file }) {
  const splitRangeStartRef = useRef(null);
  const splitRangeEndRef = useRef(null);

  const min = (a, b) => (a < b ? a : b);

  const onSplitRangeChange = () => {
    let start = parseInt(splitRangeStartRef.current.value);
    let end = parseInt(splitRangeEndRef.current.value);
    if (start < 1) {
      start = 1;
      splitRangeStartRef.current.value = 1;
    }
    if (end < 1) {
      end = 1;
      splitRangeEndRef.current.value = 1;
    }
    if (end > file.pageCount) {
      end = file.pageCount;
      splitRangeEndRef.current.value = file.pageCount;
    }
    if (start > file.pageCount) {
      start = file.pageCount;
      splitRangeStartRef.current.value = file.pageCount;
    }
    file.splitRange = [start, end];
    splitRangeStartRef.current.max = min(file.pageCount, end);
  };

  useEffect(() => {
    file.splitRange = [1, file.pageCount];

    if (file.pageCount) {
      splitRangeEndRef.current.max = file.pageCount;
      splitRangeEndRef.current.defaultValue = file.pageCount;
      splitRangeStartRef.current.defaultValue = 1;
      return;
    }
    async function func() {
      const res = await file.getPageCount();
      file.pageCount = res;
      splitRangeEndRef.current.max = file.pageCount;
      splitRangeEndRef.current.defaultValue = file.pageCount;
      splitRangeStartRef.current.defaultValue = 1;
    }
    func();
  }, []);
  return (
    <div className="mt-2 flex justify-evenly overflow-hidden rounded-md bg-primary text-white">
      <input
        className="w-full bg-primary text-right text-white"
        type="number"
        ref={splitRangeStartRef}
        min={1}
        onChange={onSplitRangeChange}
      />
      to
      <input
        className="w-full bg-primary text-center text-white"
        type="number"
        ref={splitRangeEndRef}
        onChange={onSplitRangeChange}
      />
    </div>
  );
}
