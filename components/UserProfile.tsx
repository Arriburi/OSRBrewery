import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/app/actions/user";
import { getBookmarks } from "@/app/actions/bookmarks";
import { getArticlesForUser } from "@/app/actions/articles";
import { getUserSession } from "@/app/lib/session";
import { SessionPayload } from "@/app/lib/definitions";

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};



export default async function UserProfile({ userid }: { userid: number }) {
  const userSession = await getUserSession() as SessionPayload;


  console.log("============ USER SESSION ================");
  console.log("The user session is:", userSession);


  const user = await getUser(userid);

  console.log("============ USER PROFILE ================");
  console.log("The user is:", user);

  const isOwnProfile = userSession?.userId === userid;
  const bookmarks = await getBookmarks(userSession?.userId);
  const articles = await getArticlesForUser(userid);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{user?.username}&apos;s Profile</h1>
        {userid && (
          <div className="text-foreground/70">
            <p>Member since {formatDate(user?.created_at || '')}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Articles</h2>
        {articles.length === 0 ? (
          <p>No articles created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id} className="block h-full">
                <div className="bg-background p-4 rounded-lg shadow hover:shadow-md transition-shadow h-full">
                  <div className="flex flex-col h-full">
                    {article.imgSrc && (
                      <div className="relative w-full h-40 mb-3">
                        <Image
                          src={article.imgSrc}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-foreground/70 mt-auto">
                      {formatDate(article.date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {isOwnProfile && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Bookmarked Articles</h2>
          {bookmarks.length === 0 ? (
            <p>No bookmarked articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((article) => (
                <Link href={`/articles/${article.id}`} key={article.id} className="block h-full">
                  <div className="bg-background p-4 rounded-lg shadow hover:shadow-md transition-shadow h-full">
                    <div className="flex flex-col h-full">
                      {article.imgSrc && (
                        <div className="relative w-full h-40 mb-3">
                          <Image
                            src={article.imgSrc}
                            alt={article.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-foreground/70 mt-auto">
                        {formatDate(article.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 