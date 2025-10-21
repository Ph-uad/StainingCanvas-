"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

const Error = () => {
  const router = useRouter();

  const OnPreviousLink = () =>  router.back(); 

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center gap-y-3 flex flex-col">
        <h2 className="text-6xl">Something wet wrong</h2>
        <Button 
          variant="destructive"
          className="w-fit m-auto flex"
          onClick={OnPreviousLink}
        >
          <ArrowLeftCircle className="w-4 h-4 ml-2 inline" />
          <span> Go back </span>
        </Button>
      </div>
    </div>
  );
};

export default Error;
