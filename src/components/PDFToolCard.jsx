import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PDFToolCard({ details }) {
  return (
    <Link href={details.link}>
      <div className="mx-auto w-full max-w-[300px] rounded-2xl bg-primary p-1 text-white">
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-white py-6">
          <Image src={details.icon} width={32} height={32} />
          <p className="text-xl">{details.text}</p>
        </div>
      </div>
    </Link>
  );
}
