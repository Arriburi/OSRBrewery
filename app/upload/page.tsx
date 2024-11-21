import Link from "next/link";
import Image from "next/image";


export default function Upload() {
  return (
    <div className="bg-slate-500 text-black mx-auto max-w-screen-lg px-4">
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
          <nav className="flex font-bold items-center space-x-6 text-base leading-5">
            <Link href="" className="hover:underline">Home</Link>
            <Link href="#" className="hover:underline">Profile</Link>
            <Link href="/upload" className="hover:underline">Upload</Link>
            <Link href="#" className="hover:underline">About</Link>
          </nav>
        </header>
        <main>
          <div>hehe chat</div>
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