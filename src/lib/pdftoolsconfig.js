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

const initialisePDFJS = async () => {
  if (!imageURLFunction)
    await import("./imageURLFromFile.js").then(async (imageDataURLFromFile) => {
      imageURLFunction = imageDataURLFromFile.default;
    });
};

const preProcessFiles = async (acceptedFiles, startKeyFrom = 0) => {
  await initialisePDFJS();

  acceptedFiles.forEach((file, index) => {
    file.preview = () => imageURLFunction(file, 1);
    file.imageData = null;
    file.key = index + startKeyFrom;
    file.rotate = 0;
    file.imageRef = null;
    file.deleted = false;
  });
  return acceptedFiles;
};

const pdftoolsconfig = {
  merge: {
    dropZoneProps: acceptPDFFilesProps,
    preProcessFiles: preProcessFiles,
    multiple: true,
    reorder: true,
    processor: (files) => console.log(files),
    Preview: ({ file }) => <CustomImageComponent file={file} />,
    FileExtra: ({ file }) => (
      <div className="flex-col">
        <div>
          <button
            onClick={() => {
              file.rotate = file.rotate - 90;
              file.imageRef.current.style.rotate = `${file.rotate}deg`;
            }}
          >
            RL
          </button>
          <button
            onClick={() => {
              file.rotate = file.rotate + 90;
              file.imageRef.current.style.rotate = `${file.rotate}deg`;
            }}
          >
            RR
          </button>
        </div>
        <button
          onClick={() => {
            file.deleted = true;
            document.getElementById(`file_key_${file.key}`).remove();
          }}
        >
          DEL
        </button>
      </div>
    ),
    LeftExtra: null,
  },
};

export default pdftoolsconfig;
