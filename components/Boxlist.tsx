import { BaseArticle } from "@/types/data";


const fetchAllArticles = async (): Promise<BaseArticle[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/entries");
    return response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export default async function Boxlist() {
  const articles = await fetchAllArticles();

  const recentArticles = articles.length > 0
    ? articles.slice(-3).reverse()
    : [];

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
      <ul className="list-none">
        {recentArticles.map((article) => (
          <li key={article.id} className="mb-2">
            <a
              href={`/articles/${article.id}`}
              className="text-gray-700 hover:text-gray-900"
            >
              {article.title}
            </a>
          </li>
        ))}
        {recentArticles.length === 0 && (
          <li className="text-gray-500">No recent articles</li>
        )}
      </ul>
    </div>
  );
}