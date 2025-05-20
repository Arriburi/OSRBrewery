import Boxlist from "@/components/Boxlist";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 flex flex-col rounded-md shadow-md bg-primary p-[40px] mr-4 py-4">
        <div className="mb-8 pb-4 border-b border-gray-600">
          <h1 className="text-4xl font-bold mb-4">About OSRB</h1>
          <p className="text-lg text-gray-300">
            This project was developed for the Faculty of Mathematics, Natural Sciences and Information Technologies (UP FAMNIT)
            <br />
            Course: Systems 3 - Information Systems
            <br />
            The project consisted in creating a functional website using modern web technologies.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Old School Renaissance Brewery</h2>
          <p className="text-lg mb-4">
            Welcome to the Old School Renaissance Brewery, dedicated to preserving and celebrating TSR-era D&D and its derived systems.
            Here, we focus on open-ended adventures where players drive the story forward, rather than following predetermined paths or grand narratives.
            Our focus is on maintaining the authentic experience of early tabletop roleplaying games.
          </p>
          <p className="text-lg mb-4">
            The term &quot;brewery&quot; in our name refers to the art of crafting homebrew content—user-created materials that expand and enrich
            the classic D&D experience. From custom monsters and spells to unique campaign settings, our community shares their creative
            contributions to keep the spirit of old-school D&D alive.
          </p>
          <p className="text-lg mb-4">
            This platform aims to bring together D&D homebrew content from across the web, making it easy to use and navigate.
            The goal is to unite the OSR community by providing a single, accessible space for sharing and discovering content.
          </p>
          <p className="text-lg mb-4">
            If you are new to the OSR community, you&apos;re welcome!
            You are free to explore everything that has been created and added to the site so far.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join the Community</h2>
          <p className="text-lg mb-4">
            Share your homebrew content and discover new ideas here on OSRB. Together we are preserving
            the rich core values of tabletop roleplaying games.
          </p>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="text-white hover:underline text-lg font-semibold transition-all"
            >
              Join us!
            </Link>
          </div>
        </section>
      </div>
      <div className="w-[200px]">
        <Boxlist />
      </div>
    </div>
  );
} 