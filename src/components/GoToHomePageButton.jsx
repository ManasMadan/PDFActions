"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomLink from "./CustomLinkComponent";

export default function GoToHomePageButton({
  text,
  redirecting_in,
  countdown_array,
  seconds,
}) {
  const [index, setIndex] = useState(0);
  let interval;
  const router = useRouter();
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];

  useEffect(() => {
    interval = setInterval(() => {
      setIndex((index) => Math.min(index + 1, 5));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (index === 5) {
      clearInterval(interval);
      router.push(`/${currentLanguage}`);
    }
  }, [index]);

  return (
    <div className="flex flex-col items-center gap-2 text-[#FFFFFF66]">
      <CustomLink
        href="/"
        className="mt-2 rounded-full bg-white px-6 py-3 text-primary"
      >
        {text}
      </CustomLink>
      <p>
        {redirecting_in} {countdown_array[index]} {seconds}
      </p>
    </div>
  );
}
