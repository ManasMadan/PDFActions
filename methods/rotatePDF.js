import { createPDF, JSZip, rotatePDF, zipToBlob } from "pdf-actions";

const rotatePDFHandler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfDoc = await createPDF.PDFDocumentFromFile(file);
    zip.file(
      `rotated-${file.name}`,
      await (await rotatePDF(pdfDoc, file.degrees)).save()
    );
  }
  saveAs(await zipToBlob(zip), "rotatedPDFFiles.zip");
};

export default rotatePDFHandler;
