import { createPDF, rotatePDF, downloadPDFArray, mergePDF } from "pdf-actions";

const mergePDFHandler = async (files) => {
  const pdfDocs = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfFile = await createPDF.PDFDocumentFromFile(file);
    const pdfToBeAdded = await rotatePDF(pdfFile, file.degrees);
    pdfDocs.push(pdfToBeAdded);
  }
  const mergedPdfFile = await (await mergePDF(pdfDocs)).save();
  downloadPDFArray(mergedPdfFile, "merged.pdf");
};

export default mergePDFHandler;
