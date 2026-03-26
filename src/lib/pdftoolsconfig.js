import CustomImageComponent from "@/components/CustomImageComponent";
import ImagePreviewComponent from "@/components/ImagePreviewComponent.jsx";
import PagePreviewComponent from "@/components/PagePreviewComponent.jsx";
import HTMLPreviewComponent from "@/components/HTMLPreviewComponent.jsx";
import {
  FileRotate,
  FileDelete,
  FileSplit,
} from "@/components/FileComponents.jsx";
import GlassButton from "@/components/GlassButton.jsx";
import { LeftRotate } from "@/components/LeftComponents.jsx";
import LeftResizeImage from "@/components/LeftResizeImage.jsx";
import LeftImageMargin from "@/components/LeftImageMargin.jsx";
import LeftBreakPDF from "@/components/LeftBreakPDF.jsx";
import LeftPageNumbers from "@/components/LeftPageNumbers.jsx";
import LeftEditMetaData from "@/components/LeftEditMetaData.jsx";
import LeftResizePDF from "@/components/LeftResizePDF.jsx";
import LeftMargin from "@/components/LeftMargin.jsx";
import LeftWatermark from "@/components/LeftWatermark.jsx";
import LeftUnlock from "@/components/LeftUnlock.jsx";
import LeftProtect from "@/components/LeftProtect.jsx";
import { useDictionary } from "@/lib/DictionaryProviderClient";
import mergePDFHandler from "./pdf-handlers/mergePDF.js";
import splitPDFHandler from "./pdf-handlers/splitPDF.js";
import rotatePDFHandler from "./pdf-handlers/rotatePDF.js";
import imagesToPDFHandler from "./pdf-handlers/imagesToPDF.js";
import flattenFormHandler from "./pdf-handlers/flattenForm.js";
import removeMetaDataHandler from "./pdf-handlers/removeMetaData.js";
import breakPDFHandler from "./pdf-handlers/breakPDF.js";
import addPageNumbersHandler from "./pdf-handlers/addPageNumbers.js";
import editMetaDataHandler from "./pdf-handlers/editMetaData.js";
import resizePDFHandler from "./pdf-handlers/resizePDF.js";
import addMarginHandler from "./pdf-handlers/addMargin.js";
import extractPagesHandler from "./pdf-handlers/extractPages.js";
import removePagesHandler from "./pdf-handlers/removePages.js";
import reorderPagesHandler from "./pdf-handlers/reorderPages.js";
import rotatePagesHandler from "./pdf-handlers/rotatePages.js";
import combinePagesHandler from "./pdf-handlers/combinePages.js";
import watermarkHandler from "./pdf-handlers/watermark.js";
import compressHandler from "./pdf-handlers/compress.js";
import extractImagesHandler from "./pdf-handlers/extractImages.js";
import htmlToPDFHandler from "./pdf-handlers/htmlToPDF.js";
import unlockHandler from "./pdf-handlers/unlock.js";
import protectHandler from "./pdf-handlers/protect.js";

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
const acceptImageFilesProps = {
  accept: {
    "image/*": [],
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

const preProcessImages = async (acceptedFiles, startKeyFrom = 0) => {
  for (let i = 0; i < acceptedFiles.length; i++) {
    const file = acceptedFiles[i];
    const imageURL = URL.createObjectURL(file);
    const imageBytes = await fetch(imageURL).then((res) => res.arrayBuffer());
    file.src = imageBytes;
    file.imageDataURL = imageURL;
    file.key = i + startKeyFrom;
    file.rotate = 0;
    file.imageRef = null;
    file.deleted = false;
  }
  return acceptedFiles;
};

const preProcessFilesWithPageCount = async (acceptedFiles, startKeyFrom = 0) => {
  const files = await preProcessFiles(acceptedFiles, startKeyFrom);
  for (const file of files) {
    file.pageCount = await getPDFPageCount(file);
  }
  return files;
};

const preProcessPDFPages = async (acceptedFiles, startKeyFrom = 0) => {
  await initialisePDFJS();
  const file = acceptedFiles[0];
  const pageCount = await getPDFPageCount(file);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    const imageData = await imageURLFunction(file, i);
    pages.push({
      name: `Page ${i}`,
      key: i - 1 + startKeyFrom,
      rotate: 0,
      imageRef: null,
      deleted: false,
      imageData: imageData,
      getImageData: () => Promise.resolve(imageData),
      pageNumber: i,
      sourceFile: file,
      pageCount: 1,
      getPageCount: () => Promise.resolve(1),
    });
  }
  return pages;
};

const preProcessMultiPDFPages = async (acceptedFiles, startKeyFrom = 0) => {
  await initialisePDFJS();
  const pages = [];
  let keyCounter = startKeyFrom;
  for (const file of acceptedFiles) {
    const pageCount = await getPDFPageCount(file);
    for (let i = 1; i <= pageCount; i++) {
      const imageData = await imageURLFunction(file, i);
      pages.push({
        name: `${file.name} - Page ${i}`,
        key: keyCounter++,
        rotate: 0,
        imageRef: null,
        deleted: false,
        imageData: imageData,
        getImageData: () => Promise.resolve(imageData),
        pageNumber: i,
        sourceFile: file,
        pageCount: 1,
        getPageCount: () => Promise.resolve(1),
      });
    }
  }
  return pages;
};

const preProcessHTMLFiles = async (acceptedFiles, startKeyFrom = 0) => {
  acceptedFiles.forEach((file, index) => {
    file.key = index + startKeyFrom;
    file.rotate = 0;
    file.imageRef = null;
    file.deleted = false;
    file.imageData = null;
    file.getImageData = () => Promise.resolve(null);
    file.pageCount = null;
    file.getPageCount = () => Promise.resolve(1);
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
  jpg_to_pdf: {
    dropZoneProps: acceptImageFilesProps,
    preProcessFiles: preProcessImages,
    multiple: true,
    reorder: true,
    processor: (files) => imagesToPDFHandler(files),
    Preview: ({ file }) => <ImagePreviewComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => (
      <div className="flex flex-col gap-4">
        <GlassButton onClick={() => imagesToPDFHandler(files, true)}>
          Save as Merged File
        </GlassButton>
        <LeftResizeImage />
        <LeftImageMargin files={files} />
        <LeftRotate files={files} />
      </div>
    ),
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
  resize: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => resizePDFHandler(files),
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
          <GlassButton onClick={() => resizePDFHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftResizePDF />
          <LeftRotate files={files} />
        </div>
      );
    },
  },
  add_margin: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => addMarginHandler(files),
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
          <GlassButton onClick={() => addMarginHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftMargin files={files} />
          <LeftRotate files={files} />
        </div>
      );
    },
  },
  break_pdf: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFilesWithPageCount,
    multiple: false,
    reorder: false,
    processor: (files) => breakPDFHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileRotate file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => {
      const { pdf_tools } = useDictionary();
      return (
        <div className="flex flex-col gap-4">
          <GlassButton onClick={() => breakPDFHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftBreakPDF file={files[0]} />
          <LeftRotate files={files} />
        </div>
      );
    },
  },
  flatten_forms: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => flattenFormHandler(files),
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
          <GlassButton onClick={() => flattenFormHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftRotate files={files} />
        </div>
      );
    },
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
  remove_metadata: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: false,
    reorder: false,
    processor: (files) => removeMetaDataHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: null,
  },
  extract_pages: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    preProcessFiles: preProcessPDFPages,
    multiple: false,
    reorder: false,
    processor: (pages) => extractPagesHandler(pages),
    Preview: ({ file }) => <PagePreviewComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: null,
  },
  remove_pages: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    preProcessFiles: preProcessPDFPages,
    multiple: false,
    reorder: false,
    processor: (pages) => removePagesHandler(pages),
    Preview: ({ file }) => <PagePreviewComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: null,
  },
  reorder_pages: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    preProcessFiles: preProcessPDFPages,
    multiple: false,
    reorder: true,
    processor: (pages) => reorderPagesHandler(pages),
    Preview: ({ file }) => <PagePreviewComponent file={file} />,
    FileExtra: null,
    LeftExtra: null,
  },
  rotate_pages: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    preProcessFiles: preProcessPDFPages,
    multiple: false,
    reorder: false,
    processor: (pages) => rotatePagesHandler(pages),
    Preview: ({ file }) => <PagePreviewComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => <LeftRotate files={files} />,
  },
  combine_pages: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessMultiPDFPages,
    multiple: true,
    reorder: true,
    processor: (pages) => combinePagesHandler(pages),
    Preview: ({ file }) => <PagePreviewComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: null,
  },
  watermark: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => watermarkHandler(files),
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
          <GlassButton onClick={() => watermarkHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
          <LeftWatermark />
          <LeftRotate files={files} />
        </div>
      );
    },
  },
  compress: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: false,
    processor: (files) => compressHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="mx-auto max-w-[80%] flex-col">
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => {
      const { pdf_tools } = useDictionary();
      return (
        <div className="flex flex-col gap-4">
          <GlassButton onClick={() => compressHandler(files, false)}>
            {pdf_tools.main.save_as_individual}
          </GlassButton>
        </div>
      );
    },
  },
  extract_images: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: false,
    reorder: false,
    processor: (files) => extractImagesHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: null,
  },
  html_to_pdf: {
    dropZoneProps: acceptHTMLFilesProps,
    preProcessFiles: preProcessHTMLFiles,
    multiple: false,
    reorder: false,
    processor: (files) => htmlToPDFHandler(files),
    Preview: ({ file }) => <HTMLPreviewComponent file={file} />,
    FileExtra: null,
    LeftExtra: null,
  },
  unlock: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: false,
    reorder: false,
    processor: (files) => unlockHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: ({ files }) => <LeftUnlock file={files[0]} />,
  },
  protect: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: false,
    reorder: false,
    processor: (files) => protectHandler(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: null,
    LeftExtra: ({ files }) => <LeftProtect file={files[0]} />,
  },
};

export default pdftoolsconfig;
