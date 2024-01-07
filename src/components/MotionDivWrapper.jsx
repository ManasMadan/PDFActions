"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MotionDivWrapper({
  children,
  initial,
  final,
  once,
  delay,
  duration,
}) {
  return (
    <motion.div
      transition={{ delay: delay, duration: duration }}
      initial={initial}
      whileInView={final}
      viewport={{ once: once }}
    >
      {children}
    </motion.div>
  );
}
