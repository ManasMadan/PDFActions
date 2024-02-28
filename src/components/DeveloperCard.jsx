import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DeveloperCard({ details }) {
  const { avatar, name, position, tagline, email, social_links } = details;
  return (
    <div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-[#D9D9D9] px-2 py-4 shadow-lg">
      <div className="rotate-45 rounded-full border-r-2 border-t-2 border-primary">
        <Image
          className="-rotate-45"
          src={avatar}
          width={50}
          height={50}
          alt={name}
        />
      </div>
      <div className="text-center">
        <h1 className="text-sm sm:text-base">{name}</h1>
        <p className="text-[10px] text-primary sm:text-sm">{position}</p>
      </div>
      <div className="flex flex-col justify-center gap-[2px] text-center text-[10px] text-[#00000099] mobile:flex-row md:text-xs">
        <p>{tagline.first}</p>
        <p>{tagline.last}</p>
      </div>
      <Link
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        href={"mailto:" + email}
        className="w-11/12 max-w-fit overflow-hidden text-ellipsis rounded-lg bg-primary px-2 py-1 text-center text-[8px] text-white sm:text-[10px]"
      >
        {email}
      </Link>
      <ul className="flex items-center justify-center gap-4">
        {social_links.map(({ icon, link }) => (
          <li key={icon}>
            <Link
              href={link}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={icon} width={20} height={20} alt={link} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
