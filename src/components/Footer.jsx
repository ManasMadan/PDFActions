import React from "react";
import LogoComponent from "./LogoComponent";
import LanguageSelector from "./LanguageSelector";
import { getDictionary } from "@/lib/dictionary";
import CustomLink from "./CustomLinkComponent";
import Link from "next/link";
import Developers from "./Developers";
import Image from "next/image";

async function FooterTop({ lang }) {
  const { home_page } = await getDictionary(lang);
  const powered_by = [
    { image: "pdflib", link: "https://pdf-lib.js.org/" },
    { image: "nextjs", link: "https://nextjs.org/" },
    { image: "vercel", link: "https://vercel.com/" },
    { image: "tailwind", link: "https://tailwindcss.com/" },
  ];

  return (
    <section className="container grid gap-7 py-3 lg:grid-cols-3">
      <div>
        <h1 className="text-lg">{home_page.footer.top.about_us}</h1>
        <p className="text-[#00000080]">{home_page.footer.top.about_us_text}</p>
      </div>
      <div className="flex flex-col justify-between gap-7 sm:flex-row lg:col-span-2">
        <Developers developers={home_page.footer.top.developers} />
        <div className="w-full max-w-[400px]">
          <h1 className="text-lg">{home_page.footer.top.powered_by}</h1>
          <ul className="grid grid-cols-1 gap-4 small_mobile:grid-cols-2 sm:max-w-[300px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {powered_by.map(({ link, image }) => (
              <li
                className="relative h-[40px] small_mobile:max-w-[200px]"
                key={image}
              >
                <Link href={link} className="flex justify-end" target="_blank">
                  <Image
                    src={`/images/powered_by/${image}.png`}
                    className="h-full w-full object-contain"
                    alt={image}
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

async function FooterBottom({ lang }) {
  const { home_page } = await getDictionary(lang);
  return (
    <section className="bg-primary text-white">
      <div className="container grid grid-cols-1 items-center py-3 lg:grid-cols-3 lg:py-6">
        <div className="flex items-center justify-between">
          <CustomLink
            className="text-[#D3D3D3CC] transition-colors hover:text-[#FFFFFFCC] lg:text-lg"
            href="/privacy-policy"
          >
            {home_page.footer.bottom.privacy_policy}
          </CustomLink>
          <LogoComponent className="hidden text-center sm:block lg:hidden" />
          <LanguageSelector />
        </div>
        <LogoComponent className="mt-4 text-center sm:hidden lg:mt-0 lg:block" />
        <p className="mt-2 text-center text-[#D3D3D3CC] sm:mt-0 lg:text-right lg:text-lg">
          {home_page.footer.bottom.copyright_left}
          {new Date().getFullYear()}
          {home_page.footer.bottom.copyright_right}
        </p>
      </div>
    </section>
  );
}

export default function Footer({ lang }) {
  return (
    <footer>
      <FooterTop lang={lang} />
      <FooterBottom lang={lang} />
    </footer>
  );
}
