import { imageToPDF, mergePDF, pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const imagesToPDFHandler = async (files, asMergedFile = false) => {
  const pageSize = document.getElementById("pageSize").value;
  const pageOrientation = document.getElementById("pageOrientation").value;
  const imagePosition = document.getElementById("imagePosition").value;
  const marginMillimeter = files[0]?.marginMillimeter || [0, 0, 0, 0];
  const filesToMerge = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) continue;
    const imagePDF = await imageToPDF(
      file.src,
      pageSize,
      pageOrientation,
      imagePosition,
      file.rotate,
      marginMillimeter,
    );
    if (asMergedFile) {
      filesToMerge.push(imagePDF);
    } else {
      const pdfFile = await imagePDF.save();
      const pdfBlob = pdfArrayToBlob(pdfFile);
      const fileName = file.name.split(".");
      fileName.pop();
      saveAs(pdfBlob, `${fileName.join(".")}.pdf`);
    }
  }
  if (asMergedFile) {
    const mergedPDFFile = await (await mergePDF(filesToMerge)).save();
    const pdfBlob = pdfArrayToBlob(mergedPDFFile);
    saveAs(pdfBlob, "images.pdf");
  }
};

export default imagesToPDFHandler;
