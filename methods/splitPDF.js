import { createPDF, splitPDF, JSZip } from "pdf-actions";

const splitPDFHandler = async (files) => {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfFile = await (
      await splitPDF(await createPDF.PDFDocumentFromFile(file), file.range, {
        degree: file.degrees,
      })
    ).save();
    zip.file(`split-${file.name}`, pdfFile);
  }
  await zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "splitPDFFiles.zip");
  });
};

export default splitPDFHandler;
