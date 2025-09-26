"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Creatinve writing, reminders and to-do lists.Welcome to{" "}
        <em className="underline">motion</em>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Cumque,
      </h3>
      <SignedIn>
        <Button asChild>
          <Link href="/documents">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>
            Ì Get Motion <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};
