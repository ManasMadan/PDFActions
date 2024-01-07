import WhyUse from "@/components/WhyUse";

export default async function Home({ params: { lang } }) {
  return (
    <>
      <WhyUse lang={lang} />
    </>
  );
}
