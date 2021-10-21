import { degrees, PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const rotatePDF = async (file) => {
  const fileURL = URL.createObjectURL(file);
  const data = await fetch(fileURL);
  const fileArray = await data.arrayBuffer();

  const pdfDoc = await PDFDocument.load(fileArray);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    page.setRotation(degrees(file.degrees));
  });

  return pdfDoc;
};

const handler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }

    const pdfDoc = await rotatePDF(file);
    const pdfFile = await pdfDoc.save();
    zip.file(`rotated-${file.name}`, pdfFile);
  }
  await zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "rotatedPDFFiles.zip");
  });
};

export default handler;
