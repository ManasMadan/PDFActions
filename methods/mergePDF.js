import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF } from "pdf-actions";
import { saveAs } from "file-saver";

const mergePDFHandler = async (files) => {
  const pdfDocs = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
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
};

export default mergePDFHandler;
