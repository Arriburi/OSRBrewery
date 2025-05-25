import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getUser } from "@/app/actions/user";
import { SessionPayload, User } from "./lib/definitions";
import { getUserSession } from "./lib/session";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OSRBrewery",
  description: "App for homebrewed TTRPGS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = await getUserSession() as SessionPayload;
  const user: User | null = await getUser(userSession?.userId);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased bg-background `}>
        {/* Header placed inside body */}
        <div className="relative min-h-screen bg-inherit text-foreground mx-auto max-w-screen-lg px-4">
          <div className=" flex flex-col justify-between">
            <header className="flex items-center justify-between py-10">
              <Link href="/">
                <div className="flex text-4xl font-bold">
                  <Image
                    src="/dungeon.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                  OSRBrewery
                </div>
              </Link>
              <Navbar user={user} />
            </header>

            {/* Main page content */}
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </div>
        </div>
        <footer className="text-foreground flex justify-center my-3 space-x-2 text-sm">
          <div>Arrighetti Luca • </div>
          <div>2024 • </div>
          <Link
            href="https://github.com/Arriburi/OSRBrewery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            OSRB
          </Link>
        </footer>
      </body>
    </html>
  );
}
