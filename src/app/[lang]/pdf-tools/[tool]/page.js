import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import UploadProcessFiles from "@/components/UploadProcessFiles";
import WhyUse from "@/components/WhyUse";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

export async function generateStaticParams() {
  const { home_page } = await getDictionary("en");
  return home_page.pdf_tools.map((d) => {
    return { tool: d.link.split("/")[2] };
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
      <UploadProcessFiles lang={lang} />
      <WhyUse lang={lang} />
      <Footer lang={lang} />
    </section>
  );
}
