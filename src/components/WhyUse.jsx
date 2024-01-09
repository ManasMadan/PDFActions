import React from "react";
import LogoComponent from "./LogoComponent";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";
import MotionDivWrapper from "./MotionDivWrapper";

function WhyUseCard({ details }) {
  return (
    <div className="b-red-900 relative flex w-fit max-w-[450px] md:max-w-none">
      <img src="/images/background.png" alt="border-image" />
      <div className="absolute -top-[15%] left-4 grid aspect-square w-[15%] place-items-center rounded-xl bg-[#E9B4BF] mobile:left-10">
        <div className="relative aspect-square w-4/5">
          <Image src={details.icon} fill={true} alt={details.title} />
        </div>
      </div>
      <div className="absolute left-2 top-[20%] h-3/4 w-[85%] mobile:left-8">
        <h2 className="mb-2 line-clamp-1 text-lg mobile:text-xl sm:text-2xl md:text-xl lg:mb-4 lg:text-2xl 2xl:text-3xl">
          {details.title}
        </h2>
        <div className="line-clamp-3 text-base text-[#00000066] mobile:text-lg sm:text-lg md:text-base lg:text-lg 2xl:text-2xl">
          {details.description}
        </div>
      </div>
    </div>
  );
}

export default async function WhyUse({ lang }) {
  const { home_page } = await getDictionary(lang);
  const reasons = home_page.why_use.reasons;
  return (
    <section className="container my-20">
      <div className="relative mb-8 flex justify-center gap-2 text-2xl mobile:mb-24 sm:text-3xl xl:text-4xl">
        <div className="absolute top-1/2 h-1 w-0 translate-y-[-50%] rounded-full bg-[#00000033] mobile:w-[90dvw] sm:w-full"></div>
        <div className="z-10 flex flex-wrap justify-center bg-white px-8 text-2xl sm:text-3xl xl:text-4xl">
          {home_page.why_use.title}
          <LogoComponent
            className="ml-2 text-2xl text-primary sm:text-3xl xl:text-4xl"
            classNameActions="font-bold"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2">
        {reasons.map((reason, index) => (
          <MotionDivWrapper
            delay={index * 0.1}
            key={reason.icon}
            initial={{
              opacity: 0,
              transform: `translate(${index % 2 ? 50 : -50}px,0px)`,
            }}
            final={{ opacity: 1, transform: "translate(0px,0px)" }}
            once
          >
            <div className={cn("flex", { "justify-end": index % 2 })}>
              <WhyUseCard details={reason} />
            </div>
          </MotionDivWrapper>
        ))}
      </div>
    </section>
  );
}
