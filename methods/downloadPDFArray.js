import { saveAs } from "file-saver";

const downloadPDFArray = (pdfArray) => {
  var blob = new Blob([pdfArray], { type: "application/pdf" });
  saveAs(blob);
};

export default downloadPDFArray;
