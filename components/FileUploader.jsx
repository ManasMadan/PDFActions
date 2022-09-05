import React, { useRef } from "react";
import imageDataURLFromFile from "../methods/imageDataURLfromFile";

export default function FileUploader({ setFiles, multiple, fileType }) {
  const inputRef = useRef(null);
  const onFileChange = async (e) => {
    const temp = [];
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const data = await imageDataURLFromFile(file, 1);
      file.image = data.image;
      file.pageCount = data.pageCount;
      temp.push(file);
    }

    setFiles(temp);
  };
  const handleClick = () => inputRef.current.click();

  return (
    <div className="flex items-center justify-center w-screen h-[90vh]">
      <input
        type="file"
        className="hidden"
        accept={fileType}
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => onFileChange(e)}
      />
      <div
        className="w-[80vw] h-[80vh] border-2 border-amber-400 border-dashed rounded-xl flex items-center justify-center flex-col cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex w-48 items-center justify-evenly mb-4 bg-amber-200 p-4 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 256 256"
          >
            <g fill="none" strokeMiterlimit="10" strokeWidth="0">
              <path
                fill="#E2E2E2"
                d="M86.554 26.164v58.519A5.317 5.317 0 0181.237 90H22.076a5.317 5.317 0 01-5.317-5.317V5.317A5.317 5.317 0 0122.076 0h38.315c8.269.135 26.163 16.011 26.163 26.164z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                fill="#F15642"
                d="M16.833 21.859H57.1a5.827 5.827 0 015.827 5.827v18.341a5.827 5.827 0 01-5.827 5.827H9.273a5.827 5.827 0 01-5.827-5.827V16.032"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                fill="#BE4030"
                d="M3.446 16.032a5.827 5.827 0 005.827 5.827h7.56V10.552h-7.56a5.827 5.827 0 00-5.827 5.827"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                fill="#B7B7B7"
                d="M60.391 0h6.662c2.826 0 5.536 1.123 7.534 3.121l8.847 8.847a10.655 10.655 0 013.121 7.534v6.662a6.19 6.19 0 00-6.19-6.19h-7.866a5.917 5.917 0 01-5.917-5.917V6.191A6.192 6.192 0 0060.391 0z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                fill="#FFF"
                d="M20.708 27.68h-5.489a1.5 1.5 0 00-1.5 1.5v15.331a1.5 1.5 0 103 0V39.78h3.989a4.127 4.127 0 004.122-4.121v-3.858a4.128 4.128 0 00-4.122-4.121zm1.121 7.979c0 .618-.503 1.121-1.122 1.121h-3.989v-6.1h3.989c.619 0 1.122.503 1.122 1.121v3.858zM34.554 27.68h-5.22a1.5 1.5 0 00-1.5 1.5v15.332a1.5 1.5 0 001.5 1.5h5.22a4.396 4.396 0 004.391-4.391v-9.55a4.396 4.396 0 00-4.391-4.391zm1.391 13.941c0 .767-.624 1.391-1.391 1.391h-3.72V30.68h3.72c.767 0 1.391.624 1.391 1.391v9.55zM51.841 27.68h-8.11a1.5 1.5 0 00-1.5 1.5v15.332a1.5 1.5 0 103 0v-6.166h3.812a1.5 1.5 0 100-3H45.23V30.68h6.61a1.5 1.5 0 00.001-3z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                fill="#B7B7B7"
                d="M45.142 69.824a1.5 1.5 0 01-2.122 0l-5.248-5.248v15.642a1.5 1.5 0 11-3 0V64.576l-5.248 5.248a1.5 1.5 0 11-2.121-2.121l6.323-6.323a3.565 3.565 0 012.243-1.024 1.522 1.522 0 01.608 0 3.568 3.568 0 012.243 1.024l6.323 6.323a1.502 1.502 0 01-.001 2.121z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
            </g>
          </svg>
          Choose Files
        </div>

        <div className="text-slate-400">Or Drop File(s) Here</div>
      </div>
    </div>
  );
}
