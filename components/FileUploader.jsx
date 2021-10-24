import React from "react";

export default function FileUploader({ setFiles, multiple }) {
  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          accept=".pdf"
          multiple={multiple}
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
