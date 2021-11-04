import { createPDF, splitPDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const splitPDFHandler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfFile = await (
      await splitPDF(await createPDF.PDFDocumentFromFile(file), file.range, {
        degree: file.degrees,
      })
    ).save();
    zip.file(`split-${file.name}`, pdfFile);
  }
  const zipBlob = zipToBlob(zip);
  saveAs(zipToBlob, "splittedPDFFiles.zip");
};

export default splitPDFHandler;
