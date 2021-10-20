import React from "react";

export default function FilePreview({ file }) {
  return (
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <span>{file.name}</span>
    </div>
  );
}
