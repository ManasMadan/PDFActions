import { degrees, PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const rotatePDF = async (files) => {
  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }

    const fileURL = URL.createObjectURL(file);
    const data = await fetch(fileURL);
    const fileArray = await data.arrayBuffer();

    const pdfDoc = await PDFDocument.load(fileArray);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      page.setRotation(degrees(file.degrees));
    });

    const pdfFile = await pdfDoc.save();
    zip.file(`rotated-${file.name}`, pdfFile);
  }
  return zip;
};

const handler = async (files) => {
  const zip = await rotatePDF(files);
  await zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "rotatedPDFFiles.zip");
  });
};

export default handler;
