import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

function Content({ title, para }) {
  return (
    <div className="mt-16">
      <h2 className="small-mobile:text-2xl mb-5 text-center text-xl text-black mobile:text-3xl">
        {title}
      </h2>
      <p className="small-mobile:text-sm text-base mobile:text-lg">{para}</p>
    </div>
  );
}

export default async function page({ params: { lang } }) {
  const { privacy_page } = await getDictionary(lang);
  return (
    <>
      <LandingSection
        title={privacy_page.title}
        description={privacy_page.description}
      />
      <section className="container my-20 text-sm text-primary mobile:text-justify mobile:text-base sm:text-lg md:text-xl">
        <p className="leading-loose">{privacy_page.para1}</p>

        <Content title={privacy_page.title2} para={privacy_page.para2} />
        <Content title={privacy_page.title3} para={privacy_page.para3} />
        <Content title={privacy_page.title4} para={privacy_page.para4} />
        <Content title={privacy_page.title5} para={privacy_page.para5} />
        <Content title={privacy_page.title6} para={privacy_page.para6} />
      </section>
      <Footer lang={lang} />
    </>
  );
}
