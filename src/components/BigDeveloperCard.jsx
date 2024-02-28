import { useDictionary } from "@/lib/DictionaryProviderClient";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "@/styles/bigdevelopercard.module.css";
import { cn } from "@/lib/utils";

const LeftSide = ({ developer }) => {
  const { home_page } = useDictionary();

  return (
    <div className="flex h-fit flex-col items-center gap-16">
      <div className="flex flex-col gap-6">
        <div className="aspect-square w-full rotate-45 rounded-full border-r-[3px] border-t-[3px] border-white">
          <Image
            className="-rotate-45"
            src={developer.avatar}
            fill
            alt={developer.name}
          />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl">{developer.name}</h1>
          <h2 className="text-lg">{developer.position}</h2>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-4">
        {developer.social_links.map(({ icon, link }) => (
          <li
            key={icon}
            className="grid place-items-center rounded-full bg-white p-2"
          >
            <Link href={link} target="_blank">
              <Image src={icon} width={30} height={30} alt={link} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center gap-4">
        <Link
          href={developer.resume}
          className="rounded-lg bg-white px-16 py-4 font-bold text-primary"
          target="_blank"
        >
          {home_page.footer.top.big_developer_card.resume}
        </Link>
        <Link
          href={`mailto:${developer.email}`}
          className="underline"
          target="_blank"
        >
          {home_page.footer.top.big_developer_card.hire_me}
        </Link>
      </div>
    </div>
  );
};

const RightSide = ({ developer }) => {
  const { home_page } = useDictionary();

  return (
    <div className="flex h-fit flex-col gap-16">
      <div className="text-md leading-loose sm:text-lg">
        {developer.description}
      </div>
      <div className="flex flex-col gap-8">
        <div className="underline-offset-3 text-2xl font-bold underline">
          {home_page.footer.top.big_developer_card.skills}
        </div>
        <ul className="flex flex-col gap-8">
          {developer.skills.map(({ title, score }) => (
            <li key={title}>
              <label htmlFor={`skill_score_${title}`} className="text-xl">
                {title}
              </label>
              <progress
                className={cn(
                  "mt-2 w-full bg-white",
                  styles.score_progress_bar,
                )}
                id={`skill_score_${title}`}
                value={score}
                max="1"
              >
                {score * 100}%
              </progress>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function BigDeveloperCard({ closeModal, developer, modalOpen }) {
  const closeModalIfEscapePressed = (e) => {
    if (e.code === "Escape") closeModal();
  };
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "auto";
  }, [modalOpen]);

  useEffect(() => {
    document.addEventListener("keyup", closeModalIfEscapePressed);
    return () =>
      document.removeEventListener("keyup", closeModalIfEscapePressed);
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-y-4 overflow-x-hidden sm:p-4">
      <button onClick={closeModal} className="self-end">
        <Image
          src="/icons/common/cross.svg"
          width={32}
          height={32}
          alt="Close"
        />
      </button>
      <div className="grid h-full grid-cols-1 gap-y-16 px-16 sm:grid-cols-6">
        <div className="grid place-items-center sm:col-span-2">
          <LeftSide developer={developer} />
        </div>
        <div className="hidden place-items-center sm:grid">
          <div
            className="h-full w-[2px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, #FFF 52%, rgba(255, 255, 255, 0.05) 99%)",
              borderRadius: "40px",
              boxShadow: "0px 0px 92.305px 0px var(--primary)",
            }}
          ></div>
        </div>
        <div className="grid place-items-center pb-20 sm:col-span-3 sm:pb-0">
          <RightSide developer={developer} />
        </div>
      </div>
    </div>
  );
}
