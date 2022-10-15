import Link from "next/link";
import React from "react";

export default function index() {
  const allPDFTools = [
    ["Merge PDF", "/pdf-tools/merge"],
    ["Split PDF", "/pdf-tools/split"],
    ["Rotate PDF", "/pdf-tools/rotate"],
    ["Break PDF", "/pdf-tools/break"],
    ["JPG to PDF", "/pdf-tools/jpgtopdf"],
    ["Add Page Numbers", "/pdf-tools/addpagenumbers"],
    ["Resize PDF", "/pdf-tools/resize"],
    ["Add Margin", "/pdf-tools/addmargin"],
    ["Flatten PDF Forms", "/pdf-tools/flattenform"],
    ["Edit PDF Metadata", "/pdf-tools/editmetadata"],
    ["Remove PDF Metadata", "/pdf-tools/removemetadata"],
  ];
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-12">
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
