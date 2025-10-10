"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return(
        <div className="flex items-center w-full px-6 bg-background z-50 dark:bg-[#1f1f1f] fixed bottom-0">
            <Logo/>
            <div className="md:ml-auto w-full md:w-fit justify-between md:justify-end items-center gap-x-2
            text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                 Terms and condition 
                </Button>
            </div>
        </div>
    )
}