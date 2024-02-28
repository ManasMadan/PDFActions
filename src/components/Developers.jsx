"use client";
import React, { useState } from "react";
import DeveloperCard from "./DeveloperCard";
import { motion, AnimatePresence } from "framer-motion";
import BigDeveloperCard from "./BigDeveloperCard";

export default function Developers({ developers }) {
  const [selectedId, setSelectedId] = useState(null);
  const getSelectedDeveloper = (selectedId) => {
    return developers.filter((developer) => developer.avatar == selectedId)[0];
  };
  const selectedDeveloper = getSelectedDeveloper(selectedId);
  const closeModal = () => setSelectedId(null);
  const isModalOpen = selectedId !== null;

  return (
    <div className="grid min-w-fit grid-cols-1 place-items-center gap-4 mobile:grid-cols-2">
      {developers.map((developer) => (
        <motion.div
          className="w-[180px] md:w-full"
          transition={{ duration: 0.2 }}
          layoutId={developer.avatar}
          onClick={() => {
            setSelectedId(developer.avatar);
          }}
          key={developer.avatar}
        >
          <DeveloperCard details={developer} />
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            className="fixed left-0 top-0 z-50 h-screen w-screen bg-primary text-white"
            transition={{ duration: 0.2 }}
            layoutId={selectedId}
          >
            <BigDeveloperCard
              closeModal={closeModal}
              developer={selectedDeveloper}
              modalOpen={isModalOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
