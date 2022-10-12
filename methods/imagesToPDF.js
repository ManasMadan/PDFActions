import { imageToPDF, mergePDF, pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const imagesToPDFHandler = async (
  images,
  marginMillimeter,
  asMergedFile = false
) => {
  const pageSize = document.getElementById("pageSize").value;
  const pageOrientation = document.getElementById("pageOrientation").value;
  const imagePosition = document.getElementById("imagePosition").value;
  const filesToMerge = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imagePDF = await imageToPDF(
      image.src,
      pageSize,
      pageOrientation,
      imagePosition,
      image.degrees,
      marginMillimeter
    );

    if (asMergedFile) {
      filesToMerge.push(imagePDF);
    } else {
      const pdfFile = await imagePDF.save();
      const pdfBlob = pdfArrayToBlob(pdfFile);
      const fileName = image.name.split(".");
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
