import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import styles from "@/styles/pdftoolcard.module.css";
import CustomLink from "./CustomLinkComponent";
import MotionDivWrapper from "./MotionDivWrapper";

export default function PDFToolCard({ details }) {
  return (
    <CustomLink href={details.link}>
      <MotionDivWrapper
        initial={{ opacity: 0, transform: "translate(300px,0px)" }}
        final={{ opacity: 1, transform: "translate(0px,0px)" }}
        once
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[300px] rounded-2xl bg-primary p-1 text-white",
            styles.cardwrapper,
          )}
        >
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-white py-6 transition-all">
            <Image
              src={details.icon}
              width={32}
              height={32}
              alt={details.text}
            />
            <p className="text-xl">{details.text}</p>
          </div>
        </div>
      </MotionDivWrapper>
    </CustomLink>
  );
}
