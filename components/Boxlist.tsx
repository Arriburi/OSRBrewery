import { getAllArticles } from "@/app/actions/articles";

export default async function Boxlist() {
  const articles = await getAllArticles();
  const recentArticles = articles.slice(0, 8);

  return (
    <div className="bg-primary rounded-md p-4 shadow-lg">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Posts</h2>
      <ul className="list-none">
        {recentArticles.map((article) => (
          <li key={article.id} className="mb-2">
            <a
              href={`/articles/${article.id}`}
              className="text-foreground hover:text-accent"
            >
              {article.title}
            </a>
          </li>
        ))}
        {recentArticles.length === 0 && (
          <li className="text-foreground">No recent articles</li>
        )}
      </ul>
    </div>
  );
}