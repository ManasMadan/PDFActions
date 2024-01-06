"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomLink({ href, ...props }) {
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];

  const path = `/${currentLanguage}${href}`;
  return <Link href={path} {...props} />;
}
