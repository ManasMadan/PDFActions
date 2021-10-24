import { degrees, PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const createArray = (start, stop) => {
  const res = [];
  for (let i = start; i <= stop; i++) {
    res.push(i - 1);
  }
  return res;
};

const splitPDF = async (file) => {
  const resultPDF = await PDFDocument.create();

  const fileURL = URL.createObjectURL(file);
  const data = await fetch(fileURL);
  const fileArray = await data.arrayBuffer();

  const pdfDoc = await PDFDocument.load(fileArray);
  const degree = file.degrees;
  const pages = await resultPDF.copyPages(pdfDoc, createArray(...file.range));
  pages.forEach((page) => {
    page.setRotation(degrees(degree));
    resultPDF.addPage(page);
  });

  return resultPDF;
};

const handler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file.range);
    if (file.deleted) {
      continue;
    }
    if (file.range[0] === 0) {
      file.range = [1, file.range[1]];
    }
    if (file.range[1] <= file.range[0] || file.range[1] == 0) {
      alert("Cannot Have Same Numbers in From and To Of Split PDF");
      return;
    }

    const pdfDoc = await splitPDF(file);
    const pdfFile = await pdfDoc.save();

    zip.file(`split-${file.name}`, pdfFile);
  }
  await zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "splitPDFFiles.zip");
  });
};

export default handler;
