import Link from "next/link";
import Article from "./components/Article";
import Image from "next/image";

export default function Home() {
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
          <nav className="flex font-bold items-center space-x-6 text-base leading-5">
            <Link href="" className="hover:underline">Home</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/upload" className="hover:underline">Upload</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
        </header>
        <main>
          <div className="flex flex-col pb-0 py-3">popular brewed content</div>
          <Article title="The Desert Temple" text="
          It is a long established fact that a reader will
           be distracted by the readable content of a 
           page when looking at its layout. The point of 
           using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 
            'Content here, content here', making it look like readable 
            English. Many desktop publishing packages and web page editors 
            now use Lorem Ipsum as their default model text, and a search for
             'lorem ipsum' will uncover many web sites still in their infancy. 
             Various versions have evolved over the years, sometimes by accident, 
             sometimes on purpose (injected humour and the like)."
            tags={['1AD&D', 'Adventure']} imgSrc="/temple.jpg" linkHref="" />

          <Article title="Isle of Dread" text=" 
            Map of the isle of dread"
            tags={['Map']} imgSrc="/isle.png" linkHref="" />

          <Article title="Skibold" text=" 
          Some of the smallest draconic creatures
           in the multiverse, kobolds display their 
           draconic ancestry in the glint of their scales 
           and in their roars. Legends tell of the first kobolds
            emerging from the Underdark near the lairs of the
             earliest dragons. In some lands, kobolds serve
              chromatic or metallic dragons — even worshiping
               them as divine beings. In other places, kobolds
                know too well how dangerous those dragons can be
                 and help others defend against draconic destruction."
            tags={['NPC']} imgSrc="/kobold.jpg" linkHref="" />
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
