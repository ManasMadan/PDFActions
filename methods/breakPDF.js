import { createPDF, pdfArrayToBlob, breakPDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const breakPDFHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  const file = files[0];

  const pdfFile = await createPDF.PDFDocumentFromFile(file);
  const docsFile = await breakPDF(
    pdfFile,
    file.breakPDFMaxPages,
    file.breakPDFIncludeLastPages,
    file.degrees
  );

  for (let i = 0; i < docsFile.length; i++) {
    const docArray = await docsFile[i].save();

    if (asZip) {
      zip.file(`break-${i + 1}-${file.name}`, docArray);
    } else {
      const pdfBlob = pdfArrayToBlob(docArray);
      saveAs(pdfBlob, `break-${i + 1}-${file.name}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "breakPDFFiles.zip");
  }
};

export default breakPDFHandler;
