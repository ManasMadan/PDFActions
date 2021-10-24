import React, { useEffect, useRef } from "react";

export default function FilePreview({ file, deleteFileHandler }) {
  const ref = useRef();
  let deg = file.degrees || 0;
  useEffect(() => {
    file.degrees = deg;
    ref.current.style.transform = `rotate(${deg}deg)`;
  }, []);
  file.range = file.range || [0, file.pages];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        placeItems: "center",
        gridTemplateRows: "3fr 1fr 4fr 2fr",
        height: "280px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={file.image}
        alt=""
        style={{ height: "100px", width: "100px", transition: "ease-in 0.1s" }}
        ref={ref}
      />
      <div
        style={{
          width: "180px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <span>{file.name}</span>
      </div>
      <div>
        <div
          className="d-flex flex-wrap align-items-center justify-content-center my-1"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-outline-success mx-1"
            onClick={() => {
              deg = deg - 90;
              if (deg % 360 == 0) {
                file.degrees = 0;
              } else {
                file.degrees = deg % 360;
              }
              ref.current.style.transform = `rotate(${deg}deg)`;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-counterclockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-success mx-1"
            onClick={() => {
              deg = deg + 90;
              if (deg % 360 == 0) {
                file.degrees = 0;
              } else {
                file.degrees = deg % 360;
              }
              ref.current.style.transform = `rotate(${deg}deg)`;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline-danger mx-1 d-inline"
            onClick={() => deleteFileHandler(file)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "2px",
          padding: "10px",
        }}
      >
        <input
          id="from"
          placeholder="From"
          defaultValue={file.range[0]}
          type="number"
          className="form-control"
          min={0}
          max={file.pages}
          onChange={(e) => {
            if (e.target.value < 0) {
              e.target.value = 1;
              return;
            }
            file.range = [parseInt(e.target.value), file.range[1]];
          }}
        />
        <input
          id="to"
          placeholder="To"
          defaultValue={file.range[1]}
          type="number"
          className="form-control"
          min={0}
          max={file.pages}
          onChange={(e) => {
            if (e.target.value > file.pages) {
              e.target.value = file.pages;
              return;
            }
            file.range = [file.range[0], parseInt(e.target.value)];
          }}
        />
      </div>
    </div>
  );
}
