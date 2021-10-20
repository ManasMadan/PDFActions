import { PDFDocument } from "pdf-lib";

const mergePDF = async (files) => {
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
    const fileURL = URL.createObjectURL(file);
    const data = await fetch(fileURL);
    const fileArray = await data.arrayBuffer();

    const pdfToBeAdded = await PDFDocument.load(fileArray);
    const pages = await mergedPdf.copyPages(
      pdfToBeAdded,
      pdfToBeAdded.getPageIndices()
    );
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfFile = await mergedPdf.save();
  return mergedPdfFile;
};

export default mergePDF;
