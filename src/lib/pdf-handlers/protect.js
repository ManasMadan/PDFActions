import { PDFDocument } from "pdf-lib";
import { pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const protectHandler = async (files) => {
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
  viewerPrefs.setHideToolbar(file.protectHideToolbar || false);
  viewerPrefs.setHideMenubar(file.protectHideMenubar || false);
  viewerPrefs.setHideWindowUI(file.protectHideWindowUI || false);
  viewerPrefs.setPrintScaling(
    file.protectNoPrint ? "None" : "AppDefault",
  );

  const protectedBytes = await pdfDoc.save();
  saveAs(pdfArrayToBlob(protectedBytes), `protected-${file.name}`);
};

export default protectHandler;
