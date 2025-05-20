import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  imgSrc?: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface UserProfileProps {
  username: string;
}

const fetchUserData = async (username: string): Promise<UserData | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${username}`);
    if (!response.ok) {
      console.error("Failed to fetch user data:", response.status);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const fetchUserArticles = async (username: string): Promise<Article[]> => {
  const response = await fetch(`http://localhost:3000/api/entries?author=${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user articles");
  }
  return response.json();
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default async function UserProfile({ username }: UserProfileProps) {
  const [userData, articles] = await Promise.all([
    fetchUserData(username),
    fetchUserArticles(username)
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{username}&apos;s Profile</h1>
        {userData && (
          <div className="text-foreground/70">
            <p>Member since {formatDate(userData.created_at)}</p>
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
    </div>
  );
} 