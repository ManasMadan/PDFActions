import React from "react";

export default function LeftSideEditMetaData({
  metaDataOptions,
  setMetaDataOptions,
}) {
  const handleTextInputChange = (newValue, valueType) => {
    const newMetaDataOptions = metaDataOptions;
    newMetaDataOptions[valueType] = newValue;
    if (valueType === "keywords") {
      newMetaDataOptions[valueType] = newValue.split(",");
    }
    setMetaDataOptions(newMetaDataOptions);
    console.log(newMetaDataOptions);
  };

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
  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-amber-200">
      Meta Data Options - All Details Mandatory
      {inputFields.map((inputField) => (
        <div className="flex mt-2 justify-between items-center">
          {inputField.title}
          <input
            className="bg-amber-200 h-8 pl-2 rounded-md"
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
