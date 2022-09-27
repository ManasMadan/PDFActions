import { saveAs } from "file-saver";
import { addPageNumbers, createPDF, pdfArrayToBlob } from "pdf-actions";

const addPageNumbersHandler = async (files) => {
  const file = files[0];
  const pdfDoc = await createPDF.PDFDocumentFromFile(file);
  const pdfFile = await addPageNumbers(
    pdfDoc,
    file.pageNumberPosition,
    file.margin,
    file.startingPage,
    file.endingPage,
    file.firstPageNumber,
    file.pageNumberFontSize
  );
  const pdfArray = await pdfFile.save();
  const pdfBlob = pdfArrayToBlob(pdfArray);
  saveAs(pdfBlob, `pageNumber-${file.name}`);
};

export default addPageNumbersHandler;
