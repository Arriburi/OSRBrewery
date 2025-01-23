import Link from "next/link";
import Image from "next/image";
import HomeArticle from "../HomeArticle";
import { Suspense } from "react";
import Navbar from "../Navbar";

export default function HomePage() {

  return (
    <div className="bg-inherit text-black mx-auto max-w-screen-lg px-4">
      <div className=" flex  flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <Link href="#">
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
          <Navbar />
        </header>
        <main>
          <h1 className="flex flex-col text-3xl pb-10 font-extrabold py-3">Popular brewed content</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <HomeArticle />
          </Suspense>
        </main>
        <footer className="flex justify-center mb-2 space-x-2 text-sm text-black">
          <div>Arrighetti Luca • </div>
          <div>2024 • </div>
          <div>OSRB</div>
        </footer>
      </div>
    </div>
  );
}
