"use client";

import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";
import {EditableHeader} from "./_components/header";
import {Campaign} from "./_components/campaign";

export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-40 flex-1 px-6 pb-10">
        <Heading />
        <Campaign />
        <EditableHeader /> 
      </div>
      <Footer />
    </div>
  );
}
