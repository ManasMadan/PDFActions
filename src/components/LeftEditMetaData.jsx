"use client";
import React, { useEffect } from "react";

const inputFields = [
  { title: "Title", inputId: "title", inputType: "text" },
  { title: "Subject", inputId: "subject", inputType: "text" },
  { title: "Author", inputId: "author", inputType: "text" },
  { title: "Creator", inputId: "creator", inputType: "text" },
  { title: "Producer", inputId: "producer", inputType: "text" },
  { title: "Keywords(,)", inputId: "keywords", inputType: "text" },
  {
    title: "Creation Date",
    inputId: "documentCreationDate",
    inputType: "datetime-local",
  },
  {
    title: "Modification Date",
    inputId: "documentModificationDate",
    inputType: "datetime-local",
  },
];

export default function LeftEditMetaData({ file }) {
  useEffect(() => {
    file.metaDataOptions = {
      title: "",
      subject: "",
      author: "",
      creator: "",
      producer: "",
      keywords: [],
      documentCreationDate: new Date(),
      documentModificationDate: new Date(),
    };
  }, []);

  const handleTextInputChange = (newValue, valueType) => {
    if (!file.metaDataOptions) file.metaDataOptions = {};
    file.metaDataOptions[valueType] = newValue;
    if (valueType === "keywords") {
      file.metaDataOptions[valueType] = newValue.split(",");
    }
  };

  return (
    <div className="mt-2 w-full border-y-2 border-[#E9B4BF80] py-2 tracking-wider">
      Meta Data Options - All Details Mandatory
      {inputFields.map((inputField) => (
        <div
          key={inputField.inputId}
          className="mt-2 flex items-center justify-between"
        >
          {inputField.title}
          <input
            className="h-8 rounded-md bg-[#E9B4BF80] pl-2"
            id={inputField.inputId}
            type={inputField.inputType}
            onChange={(e) =>
              handleTextInputChange(e.target.value, inputField.inputId)
            }
          />
        </div>
      ))}
    </div>
  );
}
