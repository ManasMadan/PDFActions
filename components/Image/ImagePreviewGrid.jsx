import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import ImagePreview from "./ImagePreview";

export default function FilePreviewGrid({
  images,
  setImages,
  ImagePreviewExtra,
  sortableImagePreviewGrid,
}) {
  const onSortEnd = (oldIndex, newIndex) =>
    setImages(arrayMove(images, oldIndex, newIndex));

  if (sortableImagePreviewGrid) {
    return (
      <SortableList
        onSortEnd={onSortEnd}
        className="flex flex-wrap place-content-center gap-2 md:gap-4"
        draggedItemClassName="opacity-50"
      >
        {images.map(
          (image, i) =>
            !image.deleted && (
              <SortableItem key={i}>
                <div className="cursor-grab select-none">
                  <ImagePreview
                    image={image}
                    ImagePreviewExtra={ImagePreviewExtra}
                  />
                </div>
              </SortableItem>
            )
        )}
      </SortableList>
    );
  } else {
    return (
      <div className="flex flex-wrap place-content-center gap-2 md:gap-4">
        {images.map(
          (image, i) =>
            !image.deleted && (
              <ImagePreview
                key={i}
                image={image}
                ImagePreviewExtra={ImagePreviewExtra}
              />
            )
        )}
      </div>
    );
  }
}
