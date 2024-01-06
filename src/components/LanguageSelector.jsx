"use client";
import React from "react";
import { i18n } from "@/i18n.config";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSelector() {
  const pathName = usePathname();
  const router = useRouter();
  const currentLanguage = pathName.split("/")[1];

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      <label htmlFor="language_selector" className="hidden">
        Option name
      </label>

      <select
        id="language_selector"
        className="rounded-lg border-r-8 border-transparent px-4 text-[#666666]"
        onChange={(e) => router.push(redirectedPathName(e.target.value))}
        value={currentLanguage}
      >
        {i18n.localesDisplayName.map((value, index) => (
          <option value={i18n.locales[index]} key={i18n.locales[index]}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
