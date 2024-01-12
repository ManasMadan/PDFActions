const acceptPDFFilesProps = {
  accept: {
    "application/pdf": [".pdf"],
  },
};
const acceptJPEGFilesProps = {
  accept: {
    "image/jpeg": [],
  },
};
const acceptHTMLFilesProps = {
  accept: {
    "application/html": [".html"],
  },
};
const doNotAcceptMultipleProps = {
  multiple: true,
};

const onDropFiles = async (acceptedFiles) => {
  const promises = acceptedFiles.map(async (file) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  let files = [];
  await Promise.all(promises)
    .then(() => {
      files = acceptedFiles;
    })
    .catch((error) => {
      console.error("Something Went Wrong while pre processing files", error);
      alert("Something Went Wrong");
    });
  return files;
};

const pdftoolsconfig = {
  merge: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  split: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  rotate: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  image_to_pdf: {
    dropZoneProps: acceptJPEGFilesProps,
    onDropFiles: onDropFiles,
  },
  add_page_number: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
  },
  resize: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
  },
  add_margin: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  combine_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  extract_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  remove_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  reorder_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  rotate_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  extract_images: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  break_pdf: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
  },
  flatten_forms: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  edit_metadata: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
  },
  remove_metadata: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  compress: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  html_to_pdf: {
    dropZoneProps: acceptHTMLFilesProps,
    onDropFiles: onDropFiles,
  },
  watermark: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
  unlock: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
  },
  protect: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
  },
};

export default pdftoolsconfig;
