import { BaseArticle } from "@/types/data";
import Image from "next/image";
import Link from "next/link";

interface HomeArticleProps {
  article: BaseArticle;
}

const fetchAllArticles = async (): Promise<BaseArticle[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/entries");
    return response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};


function ArticleCard({ article }: HomeArticleProps) {

  const image = article.imgSrc as string;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Link href={`/articles/${article.id}`}>
          <div className="relative w-[250px] h-[200px]">
            <Image
              src={image}
              alt={article.title || "Article image"}
              fill
              sizes="(max-width: 150) 100vw (max-width: 100px)"
              className={`bg-orange-50 shadow-[4px_4px_0px_rgba(0,0,0,1)] ${image.includes("/default/") ? "object-contain" : "object-cover"
                }`}
            />
          </div>
        </Link>
        <div className="flex flex-col pl-5">
          <Link href={`/articles/${article.id}`}>
            <div className="font-bold text-4xl">{article.title}</div>
          </Link>
          <div className="text-base  mt-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="mr-2 px-3 py-1 rounded bg-accent text-black">
                #{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="py-8">
        <p className="line-clamp-3">{article.description}</p>
      </div>
    </div>
  );
}

export default async function HomeArticle() {
  const articles = await fetchAllArticles();

  if (!articles.length) {
    return <div>No articles available.</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}