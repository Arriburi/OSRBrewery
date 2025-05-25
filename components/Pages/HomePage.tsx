import HomeArticle from "../HomeArticle";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function HomePage() {

  return (
    <main>
      <h1 className="text-3xl font-extrabold py-10">Popular brewed content</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <HomeArticle />
      </Suspense>
    </main>
  );
}
