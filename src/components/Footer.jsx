import React from "react";
import LogoComponent from "./LogoComponent";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { getDictionary } from "@/lib/dictionary";

function FooterTop({ lang }) {
  return <section className="container">Footer Top</section>;
}

async function FooterBottom({ lang }) {
  const { home_page } = await getDictionary(lang);
  return (
    <section className="bg-primary text-white">
      <div className="container grid grid-cols-1 items-center py-3 sm:grid-cols-1 lg:grid-cols-3 lg:py-6">
        <div className="flex items-center justify-between">
          <LanguageSelector />
          <LogoComponent className="hidden text-center sm:block lg:hidden" />
          <Link className="text-[#D3D3D3CC] lg:text-lg" href="/privacy-policy">
            {home_page.footer.bottom.privacy_policy}
          </Link>
        </div>
        <LogoComponent className="mt-4  text-center sm:hidden lg:mt-0 lg:block" />
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
