import { PDFDocument } from "pdf-lib";
import { pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const unlockHandler = async (files) => {
  const file = files[0];
  const password = file.unlockPassword || "";
  const bytes = await file.arrayBuffer();

  try {
    const pdfDoc = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
      password: password || undefined,
    });

    const unlockedBytes = await pdfDoc.save();
    saveAs(pdfArrayToBlob(unlockedBytes), `unlocked-${file.name}`);
  } catch (error) {
    alert(
      "Failed to unlock PDF. The file may require a different password or use unsupported encryption.",
    );
  }
};

export default unlockHandler;
