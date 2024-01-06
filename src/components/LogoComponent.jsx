import { cn } from "@/lib/utils";
import React from "react";
import { Anek_Kannada } from "next/font/google";
import CustomLink from "./CustomLinkComponent";

const anek_kannada = Anek_Kannada({
  subsets: ["latin"],
  weight: "400",
});

export default function LogoComponent({ className }) {
  return (
    <h1 className={cn("text-3xl font-bold xl:text-4xl", className)}>
      <CustomLink href="/">
        PDF<span className={anek_kannada.className}>Actions</span>
      </CustomLink>
    </h1>
  );
}
