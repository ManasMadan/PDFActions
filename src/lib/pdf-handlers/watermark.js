import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { pdfArrayToBlob, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const watermarkHandler = async (files, asZip = true) => {
  const text =
    document.getElementById("watermarkText").value || "WATERMARK";
  const fontSize =
    parseInt(document.getElementById("watermarkFontSize").value) || 40;
  const opacity =
    parseFloat(document.getElementById("watermarkOpacity").value) || 0.3;
  const rotation =
    parseInt(document.getElementById("watermarkRotation").value) || -45;

  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    for (const page of pages) {
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - textHeight / 2,
        size: fontSize,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity,
        rotate: degrees(rotation),
      });
    }

    if (file.rotate) {
      for (const page of pages) {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + file.rotate));
      }
    }

    const pdfBytes = await pdfDoc.save();
    if (asZip) {
      zip.file(`watermark-${file.name}`, pdfBytes);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfBytes);
      saveAs(pdfBlob, `watermark-${file.name}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "watermarkedPDFs.zip");
  }
};

export default watermarkHandler;
