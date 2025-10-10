"use client";

import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="h-fulll pt-40">{children}</main>
    </>
  );
};

export default MarketingLayout;
