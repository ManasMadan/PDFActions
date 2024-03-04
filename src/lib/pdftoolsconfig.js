import CustomImageComponent from "@/components/CustomImageComponent";
import { FileRotate, FileDelete } from "@/components/FileComponents.jsx";
import { LeftRotate } from "@/components/LeftComponents.jsx";
import { saveAs } from "file-saver";
import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF } from "pdf-actions";

let imageURLFunction;
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
    await import("./imageURLFromFile.js").then(async (imageDataURLFromFile) => {
      imageURLFunction = imageDataURLFromFile.default;
    });
};

const preProcessFiles = async (acceptedFiles, startKeyFrom = 0) => {
  await initialisePDFJS();

  acceptedFiles.forEach((file, index) => {
    file.preview = () => imageURLFunction(file, 1);
    file.imageData = null;
    file.key = index + startKeyFrom;
    file.rotate = 0;
    file.imageRef = null;
    file.deleted = false;
  });
  return acceptedFiles;
};

const pdftoolsconfig = {
  merge: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: true,
    processor: async (files) => {
      const pdfDocs = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const pdfFile = await createPDF.PDFDocumentFromFile(file);
        let pdfToBeAdded = pdfFile;
        if (file.degrees) {
          pdfToBeAdded = await rotatePDF(pdfFile, file.degrees);
        }
        pdfDocs.push(pdfToBeAdded);
      }
      const mergedPdfFile = await (await mergePDF(pdfDocs)).save();
      const pdfBlob = pdfArrayToBlob(mergedPdfFile);
      saveAs(pdfBlob, "merged.pdf");
    },
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="flex-col">
        <FileRotate file={file} />
        <FileDelete file={file} />
      </div>
    ),
    LeftExtra: ({ files }) => <LeftRotate files={files} />,
  },
};

export default pdftoolsconfig;
