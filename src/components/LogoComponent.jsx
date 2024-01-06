import { cn } from "@/lib/utils";
import React from "react";
import { Anek_Kannada } from "next/font/google";
import Link from "next/link";

const anek_kannada = Anek_Kannada({
  subsets: ["latin"],
  weight: "400",
});

export default function LogoComponent({ className }) {
  return (
    <Link href="/">
      <h1 className={cn("text-3xl font-bold xl:text-4xl", className)}>
        PDF<span className={anek_kannada.className}>Actions</span>
      </h1>
    </Link>
  );
}
