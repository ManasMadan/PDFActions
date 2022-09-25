import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createPDF, pdfArrayToBlob, resizePDF, zipToBlob } from "pdf-actions";

const resizePDFHandler = async (files, asZip = true) => {
  const resizeSize = document.getElementById("resizeSize").value;
  const orientation = document.getElementById("orientation").value;
  const position = document.getElementById("position").value;

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
    const resizedPDF = await resizePDF(
      pdfDocument,
      resizeSize,
      orientation,
      position,
      file.degrees
    );
    const pdfFile = await resizedPDF.save();
    if (asZip) {
      zip.file(`resized-${file.name}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `resized-${file.name}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "resizedPDFFiles.zip");
  }
};

export default resizePDFHandler;
