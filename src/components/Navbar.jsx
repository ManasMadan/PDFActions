"use client";
import React from "react";
import LogoComponent from "./LogoComponent";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="container flex flex-wrap items-center justify-between gap-2">
      <LogoComponent className="grow text-center leading-none text-white mobile:grow-0" />
      <Link
        target="_blank"
        className="flex grow items-center justify-center gap-2 pb-1 text-white underline decoration-dotted underline-offset-4 mobile:grow-0"
        href="https://www.npmjs.com/package/pdf-actions"
      >
        Try Our SDK
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.623047 0V17H17.6927V12.75H15.559V14.875H2.75676V2.125H4.89046V0H0.623047ZM9.15788 0L12.3584 3.1875L7.02417 8.5L9.15788 10.625L14.4922 5.3125L17.6927 8.5V0H9.15788Z"
            fill="white"
          />
        </svg>
      </Link>
    </header>
  );
}
