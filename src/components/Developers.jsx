"use client";
import React, { useState } from "react";
import DeveloperCard from "./DeveloperCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Developers({ developers }) {
  const [selectedId, setSelectedId] = useState(null);
  const getSelectedDeveloper = (selectedId) => {
    return developers.filter((developer) => developer.avatar == selectedId)[0];
  };

  return (
    <div className="grid min-w-fit grid-cols-2 gap-4">
      {developers.map((developer) => (
        <motion.div
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
            transition={{ duration: 0.2 }}
            layoutId={selectedId}
            className="fixed top-0 h-[400px] w-[400px] bg-white shadow-2xl"
          >
            <div>{getSelectedDeveloper(selectedId).name}</div>
            <motion.button onClick={() => setSelectedId(null)}>
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
