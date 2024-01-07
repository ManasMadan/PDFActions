"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MotionDivWrapper({ children, initial, final, once }) {
  return (
    <motion.div initial={initial} whileInView={final} viewport={{ once: once }}>
      {children}
    </motion.div>
  );
}
