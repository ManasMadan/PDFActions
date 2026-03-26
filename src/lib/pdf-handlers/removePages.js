import { PDFDocument } from "pdf-lib";
import { pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const removePagesHandler = async (pages) => {
  const activePages = pages.filter((p) => !p.deleted);
  if (activePages.length === 0) return;

  const sourceFile = activePages[0].sourceFile;
  const srcBytes = await sourceFile.arrayBuffer();
  const srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });

  const newDoc = await PDFDocument.create();
  const pageIndices = activePages.map((p) => p.pageNumber - 1);
  const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const pdfBytes = await newDoc.save();
  const blob = pdfArrayToBlob(pdfBytes);
  saveAs(blob, `removed-pages-${sourceFile.name}`);
};

export default removePagesHandler;
