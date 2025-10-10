"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { LockKeyhole, Pen, UnlockKeyhole } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isLoading } = useConvexAuth();

  return (
    <div className="w-fit space-y-4  mt-[30vh]">
      <div className="flex flex-col gap-y-4 mt-auto h-fit">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-left">
          Cloud note.
          <br />
          Write, write and share
          <br />
          Accesible from anywhere
          <br />
          {/* <em className=""> StainingCanvas </em> */}
        </h1>

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
      <div className="">

      </div>
    </div>
  );
};
