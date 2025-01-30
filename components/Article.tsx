import { Properties } from "@/types/data";
import Image from "next/image";

interface ArticleProps {
  id: number;
}

const fetchArticleById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/entries/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
};


export default async function Article({ id }: ArticleProps) {

  const article = await fetchArticleById(id);
  console.log("ACI", article);
  console.log(article.imgSrc);

  if (article == null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl pb-2 font-bold text-gray-800">{article.title} </h1>
          <span className="px-3 py-1 rounded bg-gray-900 text-white">#{article.type}</span>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>By {article.author}</p>
          <p>Published on {article.date}</p>
        </div>
      </div >
      {article.imgSrc && (
        <Image
          src={article.imgSrc}
          width={500}
          height={500}
          layout="intrinsic"
          alt={article.title}
          className="mt-8 mb-8"
        />
      )}
      <div className="divide-y divide-gray-200 pt-10">
        <h2 className="text-lg text-gray-800">Humanoid</h2>
        <div>
          {Object.entries(
            JSON.parse(article.properties) as Properties
          ).map(([key, value]) => (
            <div key={key}>
              <b>{key}: </b>{value}
            </div>
          ))}
        </div>
      </div>
      <div className="prose max-w-none pt-10 pb-8">
        <p>
          {article.description}
        </p>
      </div>
    </div>
  );
}
