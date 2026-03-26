import { saveAs } from "file-saver";
import { createPDF, editMetaData, pdfArrayToBlob } from "pdf-actions";

const editMetaDataHandler = async (files) => {
  const file = files[0];
  const options = { ...file.metaDataOptions };
  options["documentCreationDate"] = new Date(options["documentCreationDate"]);
  options["documentModificationDate"] = new Date(
    options["documentModificationDate"],
  );
  const pdfDocument = await createPDF.PDFDocumentFromFile(file);
  const newPDF = await editMetaData(pdfDocument, options);
  const pdfFile = await newPDF.save();
  const pdfBlob = pdfArrayToBlob(pdfFile);
  saveAs(pdfBlob, file.name);
};

export default editMetaDataHandler;
