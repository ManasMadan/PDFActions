import React, { useRef } from "react";
export default function AddFile({ filesLocal, setFilesLocal }) {
  const ref = useRef();
  return (
    <div>
      <input
        type="file"
        className="form-control d-none"
        accept=".pdf"
        ref={ref}
        onChange={(e) => setFilesLocal([...filesLocal, e.target.files[0]])}
      />
      <button
        class="btn btn-primary"
        type="button"
        onClick={() => ref.current.click()}
      >
        Add File
      </button>
    </div>
  );
}
