import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import UploadProcessFiles from "@/components/UploadProcessFiles";
import WhyUse from "@/components/WhyUse";
import { getDictionary } from "@/lib/dictionary";
import pdftoolsconfig from "@/lib/pdftoolsconfig";
import React from "react";

export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.keys(pdftoolsconfig).map((key) => {
    return { tool: key };
  });
}

export default async function page({ params }) {
  const { lang, tool } = params;
  const { pdf_tools_data } = await getDictionary(lang);

  return (
    <section>
      <LandingSection
        title={pdf_tools_data[tool].title}
        description={pdf_tools_data[tool].description}
      />
      <UploadProcessFiles tool={tool} />
      <WhyUse lang={lang} />
      <Footer lang={lang} />
    </section>
  );
}
