import { createPDF, splitPDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const splitPDFHandler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
    if (file.splitRange[0] > file.splitRange[1]) {
      file.splitRange = [file.splitRange[1], file.splitRange[0]];
    }
    const pdfDocument = await createPDF.PDFDocumentFromFile(file);
    const split = await splitPDF(pdfDocument, file.splitRange, {
      degree: file.degrees,
    });
    if (typeof split !== String) {
      const pdfFile = await split.save();
      zip.file(`split-${file.name}`, pdfFile);
    } else {
      alert("Error In Split Ranges");
    }
  }
  const zipBlob = await zipToBlob(zip);
  saveAs(zipBlob, "splittedPDFFiles.zip");
};

export default splitPDFHandler;
