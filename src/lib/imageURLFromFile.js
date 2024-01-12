import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs`;
const side = 250;

const imageDataURLFromFile = async (file, pageNumber) => {
  const fileURL = URL.createObjectURL(file);
  const doc = await getDocument({ url: fileURL }).promise;
  const page = await doc.getPage(pageNumber);

  const vp = page.getViewport({ scale: 1 });

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = side;

  const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
  const context = canvas.getContext("2d");
  const newVP = page.getViewport({ scale: scale });

  const renderContext = {
    canvasContext: context,
    viewport: newVP,
    transform: [
      1,
      0,
      0,
      1,
      (side - newVP.width) / 2,
      (side - newVP.height) / 2,
    ],
  };

  const renderTask = page.render(renderContext);
  await renderTask.promise;
  URL.revokeObjectURL(fileURL);
  return canvas.toDataURL();
};

export default imageDataURLFromFile;
