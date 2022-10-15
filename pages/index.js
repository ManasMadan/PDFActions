import React from "react";
import Head from "next/head";
import { PDFIcon } from "../components/icons";
import Link from "next/link";

export default function Home() {
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
    <>
      <Head>
        <title>PDFActions</title>
      </Head>
      <div className="flex justify-between p-4 md:p-12 md:h-[40vh] md:min-h-[200px]">
        <div className="text-amber-500 w-full p-4 md:p-12 font-bold tracking-wider text-4xl italic">
          All PDF Tools You Need in One Place
        </div>
        <div className="hidden md:flex justify-center items-center w-1/2">
          <div className="absolute" style={{ transform: "rotate(10deg)" }}>
            <PDFIcon width="100" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {allPDFTools.map((pdfTool, i) => (
          <Link href={pdfTool[1]} key={i}>
            <span className="flex items-center justify-center cursor-pointer border-2 h-28 w-56 border-amber-400 bg-amber-100 text-lg hover:text-xl hover:font-semibold hover:tracking-wide transition-all">
              <div>{pdfTool[0]}</div>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
