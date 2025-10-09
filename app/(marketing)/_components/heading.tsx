"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Write,Write and Share{" "}
        <em className="underline"> StainingCanvas </em>
      </h1>
    
      {!isLoading && (
        <SignedIn>
          <Button asChild>
            <Link href="/documents">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
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
          <Button>
            Ì Get Motion <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};
