import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js";

const imageDataURLFromFile = async (file) => {
  const doc = await getDocument({ url: URL.createObjectURL(file) }).promise;
  const page = await doc.getPage(1);
  var scale = 1.5;
  var viewport = page.getViewport({ scale: scale });
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  var renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  var renderTask = page.render(renderContext);
  await renderTask.promise;
  return { data: canvas.toDataURL(), pageCount: doc.numPages };
};

export default imageDataURLFromFile;
