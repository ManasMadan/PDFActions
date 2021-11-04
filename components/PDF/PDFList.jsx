import { useRouter } from "next/router";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import styles from "../../styles/filelist.module.css";
import FilePreview from "../FilePreview/FilePreview";
import FilePreview2 from "../FilePreview/FilePreview2";

//Drag handler
const DragHandle = sortableHandle(({ tabIndex }) => (
  <span className={styles.dragHandler} tabIndex={tabIndex}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-grip-horizontal"
      viewBox="0 0 16 16"
    >
      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  </span>
));

//Drag area
const SortableContainer = sortableContainer(({ children }) => {
  return <div className={styles.dragContainer}>{children}</div>;
});

const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

export default function PDFList({ files, setFiles }) {
  const router = useRouter();
  const path = router.pathname.split("/").reverse()[0];

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFiles(arrayMove(files, oldIndex, newIndex));
  };

  // Functions
  const deleteFileHandler = (file) => {
    const newFiles = files;
    newFiles.forEach((fileNew) => {
      if (fileNew == file) {
        fileNew.deleted = true;
      }
    });
    setFiles([...newFiles]);
  };

  //Draggable elements
  const SortableItem = sortableElement(({ value }) => {
    return path === "split" ? (
      <div className={styles.dragElement2}>
        <DragHandle />
        <FilePreview2 file={value} deleteFileHandler={deleteFileHandler} />
      </div>
    ) : (
      <div className={styles.dragElement}>
        <DragHandle />
        <FilePreview file={value} deleteFileHandler={deleteFileHandler} />
      </div>
    );
  });

  let allDeleted = true;
  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle axis="xy">
      {files.map((file, index) => {
        if (!file.deleted) {
          allDeleted = false;
          return (
            <SortableItem key={`item-${index}`} index={index} value={file} />
          );
        }
      })}
      {allDeleted && <h2>No Files</h2>}
    </SortableContainer>
  );
}
