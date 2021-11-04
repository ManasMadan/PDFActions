import { createPDF, rotatePDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
