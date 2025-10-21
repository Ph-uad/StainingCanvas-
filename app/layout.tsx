import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Monsieur_La_Doulaise } from "next/font/google";
import "@blocknote/shadcn/style.css";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-providers";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MonsieurLaDoulaise = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monsieur-la-doulaise",
});

export const metadata: Metadata = {
  title: "StainingCanvas",
  description: "Write, Write and Show",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${geistMono.variable} ${MonsieurLaDoulaise.variable} antialiased dark:bg-[#1f1f1f]`}
      >
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="motion-theme"
            >
              <Toaster position="bottom-right" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
