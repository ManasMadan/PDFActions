import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import PDFTools from "@/components/PDFTools";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

export default async function page({ params: { lang } }) {
  const { pdf_tools_page } = await getDictionary(lang);
  return (
    <>
      <LandingSection
        title={pdf_tools_page.title}
        description={pdf_tools_page.description}
      />
      <PDFTools className="mb-20" lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
