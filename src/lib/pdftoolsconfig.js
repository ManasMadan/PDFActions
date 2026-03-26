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
import rotatePDFHandler from "./pdf-handlers/rotatePDF.js";
import addPageNumbersHandler from "./pdf-handlers/addPageNumbers.js";
import editMetaDataHandler from "./pdf-handlers/editMetaData.js";
import LeftPageNumbers from "@/components/LeftPageNumbers.jsx";
import LeftEditMetaData from "@/components/LeftEditMetaData.jsx";

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

const preProcessFilesWithPageCount = async (
  acceptedFiles,
  startKeyFrom = 0,
) => {
  await preProcessFiles(acceptedFiles, startKeyFrom);
  for (const file of acceptedFiles) {
    file.pageCount = await getPDFPageCount(file);
  }
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
  rotate: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => rotatePDFHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => {
      const { pdf_tools } = useDictionary();

      return (
        <div className="flex flex-col gap-4">
          <GlassButton onClick={() => rotatePDFHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftRotate files={files} />
        </div>
      );
    },
  },
  add_page_number: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFilesWithPageCount,
    multiple: false,
    reorder: false,
    processor: (files) => addPageNumbersHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: ({ files }) => <LeftPageNumbers file={files[0]} />,
  },
  edit_metadata: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: false,
    reorder: false,
    processor: (files) => editMetaDataHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: ({ files }) => <LeftEditMetaData file={files[0]} />,
  },
};

export default pdftoolsconfig;
