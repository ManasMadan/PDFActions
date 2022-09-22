import Link from "next/link";
import React from "react";

export default function index() {
  const allPDFTools = [
    ["Merge PDF", "/pdf-tools/merge"],
    ["Split PDF", "/pdf-tools/split"],
    ["Rotate PDF", "/pdf-tools/rotate"],
    ["Break PDF", "/pdf-tools/break"],
  ];
  return (
    <div className="flex flex-wrap gap-4 p-12 items-center justify-center">
      {allPDFTools.map((pdfTool, i) => (
        <Link href={pdfTool[1]} key={i}>
          <span className="flex items-center justify-center cursor-pointer border-2 h-28 w-56 border-amber-400 bg-amber-100 text-lg hover:text-xl hover:font-semibold hover:tracking-wide transition-all">
            <div>{pdfTool[0]}</div>
          </span>
        </Link>
      ))}
    </div>
  );
}
