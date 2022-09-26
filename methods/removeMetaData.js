import { saveAs } from "file-saver";
import { createPDF, removeMetaData, pdfArrayToBlob } from "pdf-actions";

const removeMetaDataHandler = async (files) => {
  const file = files[0];
  const pdfDocument = await createPDF.PDFDocumentFromFile(file);
  const newPDF = await removeMetaData(pdfDocument);
  const pdfFile = await newPDF.save();
  const pdfBlob = pdfArrayToBlob(pdfFile);
  saveAs(pdfBlob, file.name);
};

export default removeMetaDataHandler;
