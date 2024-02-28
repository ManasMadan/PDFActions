import React, { useEffect } from "react";

export default function BigDeveloperCard({ closeModal, developer, modalOpen }) {
  const closeModalIfEscapePressed = (e) => {
    if (e.code === "Escape") closeModal();
  };
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "auto";
  }, [modalOpen]);

  useEffect(() => {
    document.addEventListener("keyup", closeModalIfEscapePressed);
    return () =>
      document.removeEventListener("keyup", closeModalIfEscapePressed);
  }, []);

  return (
    <div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
