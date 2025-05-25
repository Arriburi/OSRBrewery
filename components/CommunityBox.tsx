import { getAllArticles } from "@/app/actions/articles";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

async function CommunityBoxContent() {
  const articles = await getAllArticles();
  const articleCount = articles.length;

  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">Community Stats</h3>
      <div className="text-sm space-y-1">
        <div>Active users: 12 </div>
        <div>Comments Today: 8</div>
        <div>Number of articles: {articleCount}</div>
      </div>
    </div>
  );
}

export default function CommunityBox() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CommunityBoxContent />
    </Suspense>
  );
} 