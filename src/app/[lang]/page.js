import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import PDFTools from "@/components/PDFTools";
import WhyUse from "@/components/WhyUse";

export default async function Home({ params: { lang } }) {
  return (
    <>
      <LandingSection lang={lang} />
      <PDFTools lang={lang} />
      <WhyUse lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
