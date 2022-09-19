import { createPDF, rotatePDF, zipToBlob, pdfArrayToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const rotatePDFHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfDoc = await createPDF.PDFDocumentFromFile(file);
    const pdfFile = await (await rotatePDF(pdfDoc, file.degrees)).save();
    if (asZip) {
      zip.file(`rotated-${file.name}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `rotated-${file.name}`);
    }
  }
  if (asZip) {
    saveAs(await zipToBlob(zip), "rotatedPDFFiles.zip");
  }
};

export default rotatePDFHandler;
