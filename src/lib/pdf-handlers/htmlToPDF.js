import { saveAs } from "file-saver";

const htmlToPDFHandler = async (files) => {
  const html2pdf = (await import("html2pdf.js")).default;

  const file = files[0];
  const outputName = file.name.replace(/\.html?$/i, ".pdf");
  const htmlText = await file.text();

  const container = document.createElement("div");
  container.innerHTML = htmlText;
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "210mm";
  document.body.appendChild(container);

  try {
    const pdfBlob = await html2pdf()
      .set({
        margin: 10,
        filename: outputName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(container)
      .outputPdf("blob");

    saveAs(pdfBlob, outputName);
  } finally {
    document.body.removeChild(container);
  }
};

export default htmlToPDFHandler;
