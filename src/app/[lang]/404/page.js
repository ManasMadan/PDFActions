import GoToHomePageButton from "@/components/GoToHomePageButton";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";
import React from "react";

export default async function page({ params: { lang } }) {
  const { not_found_page } = await getDictionary(lang);
  return (
    <main className="grid h-dvh place-items-center bg-primary px-4 text-white">
      <section className="flex max-w-[400px] flex-col items-center gap-4">
        <Image
          priority
          src={not_found_page.image}
          width={300}
          height={175}
          alt="404 Page"
        />
        <h1 className="text-center text-3xl mobile:text-4xl">
          {not_found_page.title}
        </h1>
        <p className="text-center text-[#FFFFFF99]">
          {not_found_page.description}
        </p>
        <GoToHomePageButton
          text={not_found_page.button_text}
          redirecting_in={not_found_page.redirecting_in}
          countdown_array={not_found_page.countdown_array}
          seconds={not_found_page.seconds}
        />
      </section>
    </main>
  );
}
