import { createPDF, pdfArrayToBlob, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const compressHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
    const pdfDoc = await createPDF.PDFDocumentFromFile(file);

    // Strip metadata to reduce size
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setCreator("");
    pdfDoc.setProducer("");
    pdfDoc.setKeywords([]);

    // Save with object streams for better compression
    const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

    if (asZip) {
      zip.file(`compressed-${file.name}`, compressedBytes);
    } else {
      const pdfBlob = pdfArrayToBlob(compressedBytes);
      saveAs(pdfBlob, `compressed-${file.name}`);
    }
  }
  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "compressedPDFs.zip");
  }
};

export default compressHandler;
