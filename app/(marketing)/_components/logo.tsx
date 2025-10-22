"use client" 

import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <Link href="/" className="min-w-fit text-xs hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        alt="logo"
        width="40"
        height="40"
        className="dark:hidden w-auto h-auto"
      ></Image>
      <Image
        src="/logo-dark.svg"
        alt="logo"
        width="40"
        height="40"
        className="hidden dark:block w-auto h-auto"
      ></Image>
      <p className={cn("", font.className)}>Staining Canvas</p>
    </Link>
  );
};
