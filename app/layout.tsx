import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

// import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "AI Event Analyzer",
  description: "Create your Events and Seminars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Note: use suppressHydrationWarning for hyderation error in app 
    <html lang="en">
      <body
        className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            {/* Header */}
            <Header />

            {/* note: container */}
            <main className="min-h-screen relative mx-auto">

              {/* this one is for glow  */}
              <div className="absolute pointer-events-none inset-0 overflow-hidden -z-10">
                <div className="absoulte top-0 left-1/4 max-sm:h-60 max-sm:w-60 h-96 w-96 bg-pink-600/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 max-sm:h-60 max-sm:w-60 w-96 h-96 bg-orange-600/30 rounded-full blur-3xl" />
              </div>


              {/* todo: relative z-10 */}
              <div>
                {children}
              </div>
            </main>


            {/* Footer */}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
