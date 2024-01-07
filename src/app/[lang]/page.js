import PDFTools from "@/components/PDFTools";
import WhyUse from "@/components/WhyUse";

export default async function Home({ params: { lang } }) {
  return (
    <>
      <PDFTools lang={lang} />
      <WhyUse lang={lang} />
    </>
  );
}
