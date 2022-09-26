import { saveAs } from "file-saver";
import { createPDF, editMetaData, pdfArrayToBlob } from "pdf-actions";

const editMetaDataHandler = async (files, metaDataOptions) => {
  const options = metaDataOptions;
  options["documentCreationDate"] = new Date(
    metaDataOptions["documentCreationDate"]
  );
  options["documentModificationDate"] = new Date(
    metaDataOptions["documentModificationDate"]
  );

  const file = files[0];
  const pdfDocument = await createPDF.PDFDocumentFromFile(file);
  const newPDF = await editMetaData(pdfDocument, options);
  const pdfFile = await newPDF.save();
  const pdfBlob = pdfArrayToBlob(pdfFile);
  saveAs(pdfBlob, file.name);
};

export default editMetaDataHandler;
