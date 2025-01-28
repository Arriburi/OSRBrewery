import Link from "next/link";
import Image from "next/image";
import Boxlist from "../../../components/Boxlist";
import Article from "../../../components/Article";
import Navbar from "@/components/Navbar";


export default async function ArticleDisplay({ params }: { params: { article: number } }
) {

  const id = (await params).article;
  console.log("THE ID OF THIS IS", id);

  return (
    <div className="bg-inherit text-black mx-auto max-w-screen-lg px-4">
      <div className="flex flex-col justify-between">
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
          <div className=" flex flex-row">
            <div className="flex-1 bg-white mr-4 py-8">
              <div className="container mx-auto px-4">
                <Article id={id} />
              </div>
            </div>
            <div className="w-[200px]">
              <Boxlist />
            </div>
          </div>
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
