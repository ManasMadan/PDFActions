import React, { useRef } from "react";
import PDFList from "./PDFList";
import imageDataURLfromFile from "../methods/imageDataURLfromFile";

export default function PDFButtons({
  filesLocal,
  setFilesLocal,
  downloadPDFHandler,
}) {
  const ref = useRef();
  return (
    <div className="container-fluid">
      <input
        type="file"
        multiple
        className="form-control d-none"
        accept=".pdf"
        ref={ref}
        onChange={async (e) => {
          const temp = [];
          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const res = await imageDataURLfromFile(file);
            file.image = res;
            temp.push(file);
          }
          setFilesLocal([...filesLocal, ...temp]);
          ref.current.value = "";
        }}
      />
      <div class="row justify-content-md-center align-items-center">
        <div class="col-sm-4 d-flex flex-column">
          <button className="btn btn-danger my-2" onClick={downloadPDFHandler}>
            Save and Download
          </button>
          <button
            class="btn btn-primary my-2"
            type="button"
            onClick={() => ref.current.click()}
          >
            Add File
          </button>
          <div class="accordion" id="settings">
            <div class="accordion-item">
              <h2 class="accordion-header" id="pageSettings">
                <button
                  class="accordion-button collapsed"
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
                class="accordion-collapse collapse"
                aria-labelledby="pageSettings"
                data-bs-parent="#settings"
              >
                <div class="accordion-body">Page Settings Goes Here</div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="marginSettings">
                <button
                  class="accordion-button"
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
                class="accordion-collapse collapse"
                aria-labelledby="marginSettings"
                data-bs-parent="#settings"
              >
                <div class="accordion-body">Margin Settings Goes Here</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-8 my-3"
          style={{
            height: "50vh",
            overflowY: "scroll",
            border: "2px dashed red",
          }}
        >
          <div className="container">
            <div class="row gy-3" style={{ padding: "2rem 0px" }}>
              <PDFList files={filesLocal} setFiles={setFilesLocal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
