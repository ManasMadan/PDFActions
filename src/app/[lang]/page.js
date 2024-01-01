import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params: { lang } }) {
  const { appname } = await getDictionary(lang);

  return <div>{appname}</div>;
}
