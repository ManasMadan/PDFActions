import React, { useRef } from "react";
import PDFList from "./PDFList";
import imageDataURLfromFile from "../../methods/imageDataURLfromFile";

export default function PDFButtons({
  filesLocal,
  setFilesLocal,
  downloadPDFHandler,
  multiple,
}) {
  const ref = useRef();
  return (
    <div className="container-fluid">
      <input
        type="file"
        multiple={multiple}
        className="form-control d-none"
        accept=".pdf"
        ref={ref}
        onChange={async (e) => {
          const addFileButton = document.getElementById("addFileButton");
          const processFileButton =
            document.querySelectorAll("#processFileButton");

          addFileButton.innerText = "Adding Files ...";
          addFileButton.disabled = true;
          processFileButton.forEach((btn) => (btn.disabled = true));

          const temp = [];
          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const res = await imageDataURLfromFile(file);
            file.image = res.data;
            file.pages = res.pageCount;
            temp.push(file);
          }
          setFilesLocal([...filesLocal, ...temp]);
          ref.current.value = "";
          addFileButton.innerText = "Add Files";
          addFileButton.disabled = false;
          processFileButton.forEach((btn) => (btn.disabled = false));
        }}
      />
      <div className="row justify-content-md-center align-items-center">
        <div className="col-sm-4 d-flex flex-column">
          <button
            id="processFileButton"
            className="btn btn-danger my-2 mx-1"
            onClick={(e) => {
              downloadPDFHandler(e);
            }}
          >
            Save and Download
          </button>

          <button
            className="btn btn-primary my-2"
            type="button"
            id="addFileButton"
            onClick={() => ref.current.click()}
          >
            Add Files
          </button>
          <div className="accordion" id="settings">
            <div className="accordion-item">
              <h2 className="accordion-header" id="pageSettings">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#pageSetting"
                  aria-expanded="true"
                  aria-controls="pageSetting"
                >
                  Page Settings
                </button>
              </h2>
              <div
                id="pageSetting"
                className="accordion-collapse collapse"
                aria-labelledby="pageSettings"
                data-bs-parent="#settings"
              >
                <div className="accordion-body">Page Settings Goes Here</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="marginSettings">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#marginSetting"
                  aria-expanded="true"
                  aria-controls="marginSetting"
                >
                  Margin Settings
                </button>
              </h2>
              <div
                id="marginSetting"
                className="accordion-collapse collapse"
                aria-labelledby="marginSettings"
                data-bs-parent="#settings"
              >
                <div className="accordion-body">Margin Settings Goes Here</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-8 my-3"
          style={{
            height: "50vh",
            overflowY: "scroll",
            border: "2px dashed red",
          }}
        >
          <div className="container">
            <div className="row gy-3" style={{ padding: "2rem 0px" }}>
              <PDFList files={filesLocal} setFiles={setFilesLocal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
