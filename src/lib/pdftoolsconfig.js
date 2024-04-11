import CustomImageComponent from "@/components/CustomImageComponent";
import {
  FileRotate,
  FileDelete,
  FileSplit,
} from "@/components/FileComponents.jsx";
import GlassButton from "@/components/GlassButton.jsx";
import { LeftRotate } from "@/components/LeftComponents.jsx";
import { useDictionary } from "@/lib/DictionaryProviderClient";
import mergePDFHandler from "./pdf-handlers/mergePDF.js";
import splitPDFHandler from "./pdf-handlers/splitPDF.js";

let imageURLFunction, getPDFPageCount;
const acceptPDFFilesProps = {
  accept: {
    "application/pdf": [".pdf"],
  },
};
const acceptJPEGFilesProps = {
  accept: {
    "image/jpeg": [],
  },
};
const acceptHTMLFilesProps = {
  accept: {
    "application/html": [".html"],
  },
};
const doNotAcceptMultipleProps = {
  multiple: false,
};

const initialisePDFJS = async () => {
  if (!imageURLFunction)
    await import("./pdfLib.js").then(async (pdfLib) => {
      imageURLFunction = pdfLib.imageDataURLFromFile;
      getPDFPageCount = pdfLib.getPDFPageCount;
    });
};

const preProcessFiles = async (acceptedFiles, startKeyFrom = 0) => {
  await initialisePDFJS();

  acceptedFiles.forEach((file, index) => {
    file.getImageData = () => imageURLFunction(file, 1);
    file.imageData = null;
    file.key = index + startKeyFrom;
    file.rotate = 0;
    file.imageRef = null;
    file.deleted = false;
    file.getPageCount = () => getPDFPageCount(file);
    file.pageCount = null;
  });
  return acceptedFiles;
};

const pdftoolsconfig = {
  merge: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: true,
    processor: (files) => mergePDFHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => <LeftRotate files={files} />,
  },
  split: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => splitPDFHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileSplit file={file} />
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => {
      const { pdf_tools } = useDictionary();

      return (
        <div className="flex flex-col gap-4">
          <GlassButton onClick={() => splitPDFHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftRotate files={files} />
        </div>
      );
    },
  },
};

export default pdftoolsconfig;
