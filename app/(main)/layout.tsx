"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import MainNavigation from "./_components/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg[#1f1f1f]">
      <MainNavigation />
      <main className=" flex-1 h-full overflow-y-auto px-2">
        {children}</main>
    </div>
  );
};

export default MainLayout;
