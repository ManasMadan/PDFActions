import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import FilePreview from "./FilePreview.jsx";

export default function FilePreviewGrid({ files, FilePreviewExtra, setFiles }) {
  const onSortEnd = (oldIndex, newIndex) =>
    setFiles(arrayMove(files, oldIndex, newIndex));

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="grid"
      style={{
        gridGap: "20px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
      draggedItemClassName="opacity-50"
    >
      {files.map((file, i) => (
        <SortableItem key={i}>
          <div className="cursor-grab select-none">
            <FilePreview file={file}>
              {FilePreviewExtra && <FilePreviewExtra />}
            </FilePreview>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
}
