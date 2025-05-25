import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

async function TrendingBoxContent() {
  // In the future, this could fetch trending topics from an API
  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">Trending Topics</h3>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag1</span>
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag2</span>
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag3</span>
      </div>
    </div>
  );
}

export default function TrendingBox() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TrendingBoxContent />
    </Suspense>
  );
} 