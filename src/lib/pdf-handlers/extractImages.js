import JSZip from "jszip";
import { saveAs } from "file-saver";

const extractImagesHandler = async (files) => {
  const { getDocument } = await import("pdfjs-dist");
  const file = files[0];
  const fileURL = URL.createObjectURL(file);
  const doc = await getDocument({ url: fileURL }).promise;
  const zip = new JSZip();
  const scale = 2;

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = vp.width;
    canvas.height = vp.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport: vp }).promise;

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    const arrayBuffer = await blob.arrayBuffer();
    zip.file(`page-${i}.png`, arrayBuffer);
  }

  URL.revokeObjectURL(fileURL);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, `${file.name}-images.zip`);
};

export default extractImagesHandler;
