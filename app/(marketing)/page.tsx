"use client";

import { Heading } from "./_components/heading"; 
import { Footer } from "./_components/footer";
// import {EditableHeader} from "./_components/header";
import {Campaign} from "./_components/campaign";

export default function MarketingPage() {
  return (
    <div className="min-h-full">
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-x-2 gap-y-10">
        <Campaign />
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <Heading />
      </div>
      <Footer />
    </div>
  );
}
