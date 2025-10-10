"use client";

import { Logo } from "./logo";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/ui/mode-toggle"; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


export const Navbar = () => {
  const scrolled = useScrollTop(); 

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </SignInButton>

          <SignInButton mode="modal">
            <Button size="sm">Get Motion Free</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Button variant="ghost" size="sm" asChild>
          </Button>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </div>
    </div>
  );
};
