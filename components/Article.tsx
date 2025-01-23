import { KeyValue } from "../types/data";

interface ArticleProps {
  id: number;
}

const fetchArticleById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/entries?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
};


function createPropertyDiv(property: KeyValue) {
  return (
    <div>
      <b>{property.key}: </b>{property.value}
    </div>
  );
}


export default async function Article({ id }: ArticleProps) {

  const article = await fetchArticleById(id);
  console.log("ACI", article);

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
      </div>
      <div className="divide-y divide-gray-200 pt-10">
        <h2 className="text-lg text-gray-800">Humanoid</h2>
        {article.properties?.map((p: KeyValue) => createPropertyDiv(p))}
      </div>
      <div className="prose max-w-none pt-10 pb-8">
        <p>
          {article.text}
        </p>
      </div>
    </div>
  );
}
