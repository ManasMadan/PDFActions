import React from "react";
import LogoComponent from "./LogoComponent";
import LanguageSelector from "./LanguageSelector";
import { getDictionary } from "@/lib/dictionary";
import CustomLink from "./CustomLinkComponent";
import DeveloperCard from "./DeveloperCard";

function FooterTop({ lang }) {
  return (
    <section className="container grid gap-x-3 py-3 xl:grid-cols-2">
      <div>
        <h1 className="text-lg">About Us</h1>
        <p className="text-sm text-[#00000080]">
          Welcome to PDFActions - your secure, hassle-free PDF solution. Process
          files in your browser with no data uploads. Works on Windows, Mac,
          Linux, and mobile devices. Simplify your PDF tasks with us!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex w-full max-w-[650px] flex-col sm:flex-row">
          <DeveloperCard />
          <DeveloperCard />
        </div>
        <div className="w-full sm:max-w-[300px] lg:max-w-none">
          <h1>Powered By</h1>
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
            className="text-[#D3D3D3CC] lg:text-lg"
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
