import { createPDF, pdfArrayToBlob, addMarginPDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const addMarginHandler = async (files, asZip = true) => {
  const marginMillimeter = files[0].marginMillimeter || [0, 0, 0, 0];
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
    const addedMarginFile = await addMarginPDF(
      pdfDocument,
      marginMillimeter,
      file.rotate,
    );
    const pdfFile = await addedMarginFile.save();
    if (asZip) {
      zip.file(`newMargin-${file.name}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `newMargin-${file.name}`);
    }
  }
  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "newMarginPDFFiles.zip");
  }
};

export default addMarginHandler;
