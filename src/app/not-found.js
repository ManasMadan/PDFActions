"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Custom404() {
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${currentLanguage}/404`);
  }, []);

  return;
}
