import Boxlist from "@/components/Boxlist";
import Article from "@/components/Article";
import { Suspense } from "react";
import Comments from "@/components/Comments";
import { getUserSession } from "@/app/lib/session";
import { SessionPayload } from "@/app/lib/definitions";
import { getUser } from "@/app/actions/user";
import { getArticleById } from "@/app/actions/article";
import BoxFromAdmin from "@/components/BoxFromAdmin";
import TrendingBox from "@/components/TrendingBox";
import CommunityBox from "@/components/CommunityBox";
import RelatedArticlesBox from "@/components/RelatedArticlesBox";

export default async function ArticleDisplay({ params }: { params: Promise<{ article: number }> }) {
  const id = (await params).article;
  const userSession = await getUserSession() as SessionPayload;
  const user = await getUser(userSession?.userId);

  return (
    <main>
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="rounded-md shadow-md bg-primary p-[20px] mr-4 py-8">
            <div className="container mx-auto px-4">
              <Suspense fallback={<div>Loading...</div>}>
                <Article id={id} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="w-[200px] flex flex-col gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Boxlist />
          </Suspense>
          <RelatedArticlesBox />
          <BoxFromAdmin articleId={id} />
          <TrendingBox />
          <CommunityBox />
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-md shadow-md bg-primary p-[20px]">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
              {<Comments articleId={id} user={user} />}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
