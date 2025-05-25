import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

async function RelatedArticlesBoxContent() {
  // In the future, this could fetch related articles based on tags or content
  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">Related Articles</h3>
      <div className="space-y-2">
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 1</div>
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 2</div>
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 3</div>
      </div>
    </div>
  );
}

export default function RelatedArticlesBox() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RelatedArticlesBoxContent />
    </Suspense>
  );
} 