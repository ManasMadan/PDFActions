import React from "react";
import Navbar from "./Navbar";
import styles from "@/styles/landingsection.module.css";

export default async function LandingSection({ title, description }) {
  return (
    <section className="bg-primary pt-8">
      <Navbar />
      <h1 className="mt-20 text-center text-4xl text-white mobile:text-5xl">
        {title}
      </h1>
      <h2 className="mb-10 mt-2 text-center text-base text-[#FFFFFFBB] mobile:mb-5 mobile:text-lg md:mb-0">
        {description}
      </h2>
      <div className={styles.spacer}></div>
    </section>
  );
}
