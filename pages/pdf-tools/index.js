import Link from "next/link";
import React from "react";

export default function index() {
  const allPDFTools = [
    ["Merge PDF", "/pdf-tools/merge"],
    ["Split PDF", "/pdf-tools/split"],
    ["Rotate PDF", "/pdf-tools/rotate"],
    ["Break PDF", "/pdf-tools/break"],
    ["Image to PDF", "/pdf-tools/fromimage"], // 6
    ["Add Page Numbers", "/pdf-tools/addpagenumbers"], // 5
    ["Remove PDF Pages", "/pdf-tools/removepdfpages"], // 11
    ["Extract PDF Pages", "/pdf-tools/extractpdfpages"], // 7
    ["Extract PDF Images", "/pdf-tools/extractpdfpages"], // 8
    ["Reorder PDF Pages", "/pdf-tools/reorderpdfpages"], // 9
    ["Rotate PDF Pages", "/pdf-tools/rotatepdfpages"], // 10
    ["Resize PDF", "/pdf-tools/resize"], // 1 - Done
    ["Add Margin", "/pdf-tools/addmargin"], // 2
    ["Flatten PDF Forms", "/pdf-tools/flattenform"],
    ["Edit PDF Metadata", "/pdf-tools/editmetadata"], // 3
    ["Remove PDF Metadata", "/pdf-tools/removemetadata"], // 4
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
