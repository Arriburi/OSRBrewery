import Link from "next/link";
import Boxlist from "@/components/Boxlist";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function AboutPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 rounded-md shadow-md bg-primary p-[20px] mr-4 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">About OSRB</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to OSRB</h2>
            <p className="text-lg mb-4">
              OSRB is a platform dedicated to the Old School Renaissance (OSR) community, where tabletop RPG enthusiasts can create, share, and discover homebrew content. Whether you're looking for new adventures, spells, monsters, or want to share your own creations, OSRB is your hub for all things OSR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Share your homebrew content with the community</li>
              <li>Discover new adventures and game elements</li>
              <li>Connect with other tabletop RPG enthusiasts</li>
              <li>Build your collection of custom game content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Join the Community</h2>
            <p className="text-lg mb-4">
              Share your homebrew content and discover new ideas here on OSRB. Together we are preserving
              the rich core values of tabletop roleplaying games.
            </p>
            <div className="flex justify-center">
              <Link
                href="/register"
                className="text-accent hover:underline text-lg font-semibold"
              >
                Join us!
              </Link>
            </div>
          </section>
        </div>
      </div>
      <div className="w-[200px]">
        <Suspense fallback={<LoadingSpinner />}>
          <Boxlist />
        </Suspense>
      </div>
    </div>
  );
} 