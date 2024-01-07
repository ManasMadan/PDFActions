import React from "react";
import PDFToolCard from "./PDFToolCard";
import { getDictionary } from "@/lib/dictionary";

export default async function PDFTools({ lang }) {
  const { home_page } = await getDictionary(lang);
  return (
    <section className="container mt-20 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {home_page.pdf_tools.map((details) => (
        <PDFToolCard details={details} key={details.icon} />
      ))}
    </section>
  );
}
