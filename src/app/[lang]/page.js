import Footer from "@/components/Footer";
import LandingSectionHomePage from "@/components/LandingSectionHomePage";
import PDFTools from "@/components/PDFTools";
import WhyUse from "@/components/WhyUse";

export default async function Home({ params: { lang } }) {
  return (
    <>
      <LandingSectionHomePage lang={lang} />
      <PDFTools lang={lang} />
      <WhyUse lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
