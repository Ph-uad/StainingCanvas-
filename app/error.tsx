"use client";

import { Button } from "@/components/ui/button"; 
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between">
      <h2>SOmething wet wrong</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;