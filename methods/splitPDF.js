import { createPDF, splitPDF, zipToBlob, pdfArrayToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const splitPDFHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
    const pdfDocument = await createPDF.PDFDocumentFromFile(file);
    const split = await splitPDF(pdfDocument, file.splitRange, file.degrees);
    if (typeof split !== String) {
      const pdfFile = await split.save();
      if (asZip) {
        zip.file(`split-${file.name}`, pdfFile);
      } else {
        const pdfBlob = pdfArrayToBlob(pdfFile);
        saveAs(pdfBlob, `split-${file.name}`);
      }
    } else {
      alert("Error In Split Ranges");
    }
  }
  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "splittedPDFFiles.zip");
  }
};

export default splitPDFHandler;
