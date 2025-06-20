import { getArticleById } from "@/app/actions/article";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface BoxFromAdminProps {
  articleId: number;
}

async function BoxFromAdminContent({ articleId }: BoxFromAdminProps) {
  const article = await getArticleById(articleId);

  if (!article) return null;

  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">More from {article.author}</h3>
      <div className="space-y-2">
        <div className="text-sm hover:text-accent cursor-pointer">Article 1</div>
        <div className="text-sm hover:text-accent cursor-pointer">Article 2</div>
        <div className="text-sm hover:text-accent cursor-pointer">Article 3</div>
      </div>
    </div>
  );
}

export default function BoxFromAdmin(props: BoxFromAdminProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BoxFromAdminContent {...props} />
    </Suspense>
  );
} 