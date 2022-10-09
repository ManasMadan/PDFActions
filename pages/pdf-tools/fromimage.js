import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import ImageProcess from "../../components/ImageProcess";
import imagesToPDFHandler from "../../methods/imagesToPDF.js";

export default function fromimage() {
  const [images, setImages] = useState([]);

  const onFileChange = async (e) => {
    const temp = [];
    const images = e.target.files;

    for (var i = 0; i < images.length; i++) {
      const image = images[i];
      const imageURL = URL.createObjectURL(image);
      const imageData = { src: imageURL, name: image.name };
      temp.push(imageData);
    }

    setImages(temp);
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Image to PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-amber-200 border-gray-600 border-t-2 border-dotted text-gray-600 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Image to PDF
        </div>
        <div>Convert Images to PDF in one go</div>
      </div>

      {images.length === 0 && (
        <FileUploader
          onFileChange={onFileChange}
          fileType="image/*"
          multiple={true}
        />
      )}
      {images.length !== 0 && (
        <ImageProcess
          images={images}
          setImages={setImages}
          addFileOptions={{ fileType: "image/*", multiple: true }}
          downloadHandler={imagesToPDFHandler}
        />
      )}
    </div>
  );
}
