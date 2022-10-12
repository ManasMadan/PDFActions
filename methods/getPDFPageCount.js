import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js";
const getPDFPageCount = async (file) => {
  const fileURL = URL.createObjectURL(file);
  const doc = await getDocument({ url: fileURL }).promise;
  return doc.numPages;
};

export default getPDFPageCount;
