import CustomImageComponent from "@/components/CustomImageComponent";

let imageURLFunction;
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
  multiple: false,
};

const onDropTemp = async (acceptedFiles) => {
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

const initialisePDFJS = async () => {
  if (!imageURLFunction)
    await import("./imageURLFromFile.js").then(async (imageDataURLFromFile) => {
      imageURLFunction = imageDataURLFromFile.default;
    });
};

const onDropFiles = async (acceptedFiles) => {
  await initialisePDFJS();

  acceptedFiles.forEach((file) => {
    file.preview = () => imageURLFunction(file, 1);
    file.loadedPreview = false;
  });
  return acceptedFiles;
};

const pdftoolsconfig = {
  merge: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: true,
    Preview: (props) => <CustomImageComponent {...props} />,
    FileExtra: ({ file }) => <div className="line-clamp-1">{file.name}</div>,
    LeftExtra: (props) => <div>Left Extra</div>,
  },
  split: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  rotate: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  image_to_pdf: {
    dropZoneProps: acceptJPEGFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  add_page_number: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  resize: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  add_margin: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  combine_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  extract_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  remove_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  reorder_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  rotate_pages: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  extract_images: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  break_pdf: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  flatten_forms: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  edit_metadata: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  remove_metadata: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  compress: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  html_to_pdf: {
    dropZoneProps: acceptHTMLFilesProps,
    onDropFiles: onDropTemp,
    Preview: (props) => <div>{props.file.name}</div>,
  },
  watermark: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  unlock: {
    dropZoneProps: { ...acceptPDFFilesProps, ...doNotAcceptMultipleProps },
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
  protect: {
    dropZoneProps: acceptPDFFilesProps,
    onDropFiles: onDropFiles,
    reorder: false,
    Preview: (props) => <CustomImageComponent {...props} />,
  },
};

export default pdftoolsconfig;
