import {
  createPDF,
  pdfArrayToBlob,
  flattenPDFForm,
  zipToBlob,
  rotatePDF,
} from "pdf-actions";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const flattenPDFFormHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }
    const pdfFile = await createPDF.PDFDocumentFromFile(file);
    let flattenFormPDF = await flattenPDFForm(pdfFile);
    if (file.degrees) {
      flattenFormPDF = await rotatePDF(flattenFormPDF, file.degrees);
    }
    const fileArray = await flattenFormPDF.save();
    if (asZip) {
      zip.file(`flatten-${file.name}`, fileArray);
    } else {
      const pdfBlob = pdfArrayToBlob(fileArray);
      saveAs(pdfBlob, `flatten-${file.name}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "splittedPDFFiles.zip");
  }
};

export default flattenPDFFormHandler;
