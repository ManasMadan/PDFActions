import React, { useRef } from "react";
import Head from "next/head";
import { PDFIcon } from "../components/icons";
import Link from "next/link";

export default function Home() {
  const modalRef = useRef(null);
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
  const closeModal = () => {
    modalRef.current.classList.add("hidden");
  };
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
      <div
        ref={modalRef}
        className="absolute z-50 left-1/2 top-1/2 bg-amber-200 border-black border-2 px-8 py-4"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <span className="text-blue-800">
          <Link href="https://www.linkedin.com/in/manas-madan/">
            Manas Madan
          </Link>
        </span>{" "}
        and{" "}
        <span className="text-blue-800">
          <Link href="https://www.linkedin.com/in/ayush-arora4/">
            Ayush Arora
          </Link>
        </span>{" "}
        are revamping this website
        <div className="mt-2">
          Check out the new look on{" "}
          <span className="text-blue-800">
            <Link href="https://pdfactions-git-revamp-manasmadan.vercel.app/">
              https://pdfactions-git-revamp-manasmadan.vercel.app/
            </Link>
          </span>
        </div>
        <div className="mt-2">
          Mail out any suggestions to{" "}
          <span className="text-blue-800">
            <Link href="mailto:manasmadan08@gmail.com">
              manasmadan08@gmail.com
            </Link>
          </span>{" "}
          or{" "}
          <span className="text-blue-800">
            <Link href="mailto:ayusharora4102004@gmail.com">
              ayusharora4102004@gmail.com
            </Link>
          </span>
        </div>
        <div
          onClick={closeModal}
          className="mt-4 bg-blue-800 text-white px-4 py-2 w-fit mx-auto cursor-pointer"
        >
          Close
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
