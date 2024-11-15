import Article from "./components/Article";

export default function Home() {
  return (
    <div className="bg-blue-400 text-black mx-auto max-w-screen-lg px-4">
      <div className=" flex  flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <a href="#">
            <div className="flex text-4xl font-bold">
              <img src="/dungeon.svg" alt="Logo" className="h-10 w-10 mr-3">
              </img>
              OSRBrewery
            </div>
          </a>
          <nav className="flex font-bold items-center space-x-6 text-base leading-5">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Profile</a>
            <a href="#" className="hover:underline">Upload</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </header>
        <main>
          <div className="flex flex-col mx-20 p-5 pb-0 py-3">popular brewed content</div>
          <Article title="gianmix" text="sssssssss" />
          <Article title="The Crimson Diamond" text="
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
             sometimes on purpose (injected humour and the like)."/>
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
