import React from "react";
import Navbar from "./Navbar";
import styles from "@/styles/landingsection.module.css";

export default function LandingSection() {
  return (
    <section className="bg-primary">
      <Navbar />
      <div className={styles.spacer}></div>
    </section>
  );
}
