import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

export default async function page({ params: { lang } }) {
  const { privacy_page } = await getDictionary(lang);
  return (
    <>
      <LandingSection
        title={privacy_page.title}
        description={privacy_page.description}
      />
      <Footer lang={lang} />
    </>
  );
}
