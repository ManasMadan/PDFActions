import { PDFDocument } from "pdf-lib";
import { pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const combinePagesHandler = async (pages) => {
  const activePages = pages.filter((p) => !p.deleted);
  if (activePages.length === 0) return;

  const newDoc = await PDFDocument.create();

  const loadedDocs = new Map();
  for (const page of activePages) {
    const fileName = page.sourceFile.name;
    if (!loadedDocs.has(fileName)) {
      const bytes = await page.sourceFile.arrayBuffer();
      loadedDocs.set(
        fileName,
        await PDFDocument.load(bytes, { ignoreEncryption: true }),
      );
    }
    const srcDoc = loadedDocs.get(fileName);
    const [copiedPage] = await newDoc.copyPages(srcDoc, [
      page.pageNumber - 1,
    ]);
    newDoc.addPage(copiedPage);
  }

  const pdfBytes = await newDoc.save();
  const blob = pdfArrayToBlob(pdfBytes);
  saveAs(blob, "combined.pdf");
};

export default combinePagesHandler;
