"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { LockKeyhole, Pen, UnlockKeyhole } from "lucide-react";
import { Monsieur_La_Doulaise } from "next/font/google";
import Link from "next/link";

const MonsieurLaDoulaise = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monsieur-la-doulaise",
});
export const Heading = () => {

  const { isLoading } = useConvexAuth();

  return (
    <div className=" space-y-4  w-full">
      <div className="flex flex-col gap-y-4 h-fit w-full px-20">
        <h1 className={`md:scale-200 text-9xl font-bold ${MonsieurLaDoulaise.className} text-center`}>
          Write
        </h1>
        <p className="ml-auto italic lowercase">... it&apos;s Accessible from anywhere</p>

        {!isLoading && (
          <SignedIn>
            <Button asChild className="hover:cursor-pointer w-fit ml-auto">
              <Link href="/documents">
                Go write <Pen className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </SignedIn>
        )}

        {isLoading && (
          <div className="w-fit mx-auto">
            <Spinner size="icon" />
          </div>
        )}

        <SignedOut>
          <SignInButton mode="modal">
            <Button className="group hover:cursor-pointer w-fit ml-auto">
              <UnlockKeyhole className="group-hover:block hidden transition ml-2 h-4 w-4" />
              <LockKeyhole className="group-hover:hidden ml-2 h-4 w-4" />
              <span> Login/Signup </span>
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
      <div className=""></div>
    </div>
  );
};
