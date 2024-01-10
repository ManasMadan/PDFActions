import React from "react";
import PDFToolCard from "./PDFToolCard";
import { getDictionary } from "@/lib/dictionary";
import MotionDivWrapper from "./MotionDivWrapper";
import { cn } from "@/lib/utils";

export default async function PDFTools({ lang, className }) {
  const { home_page } = await getDictionary(lang);
  return (
    <section
      className={cn(
        "container mt-20 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
    >
      {home_page.pdf_tools.map((details, index) => (
        <MotionDivWrapper
          initial={{ opacity: 0, transform: "translate(50px,0px)" }}
          final={{ opacity: 1, transform: "translate(0px,0px)" }}
          once
          delay={index * 0.01}
          key={details.icon}
        >
          <PDFToolCard details={details} />
        </MotionDivWrapper>
      ))}
    </section>
  );
}
