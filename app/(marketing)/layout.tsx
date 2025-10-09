"use client"


import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-[#1f1f1f]">
        <Navbar/>
      <main className="h-fulll pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
