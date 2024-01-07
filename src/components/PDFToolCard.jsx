import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/pdftoolcard.module.css";
import CustomLink from "./CustomLinkComponent";

export default function PDFToolCard({ details }) {
  return (
    <CustomLink href={details.link}>
      <div
        className={cn(
          "mx-auto w-full max-w-[300px] rounded-2xl bg-primary p-1 text-white",
          styles.cardwrapper,
        )}
      >
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-white py-6 transition-all">
          <Image src={details.icon} width={32} height={32} alt={details.text} />
          <p className="text-xl">{details.text}</p>
        </div>
      </div>
    </CustomLink>
  );
}
