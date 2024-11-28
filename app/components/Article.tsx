import { BaseArticle } from "../types/data";
import { KeyValue } from "../types/data";

interface ArticleProps {
  article: BaseArticle;
}

function createPropertyDiv(property: KeyValue) {
  return (
    <div>
      <b>{property.key}: </b>{property.value}
    </div>
  );
}


export default function Article({ article }: ArticleProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl pb-2 font-bold text-gray-800">{article.title} </h1>
          <span className="px-3 py-1 rounded bg-gray-900 text-white">#{article.type}</span>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>By {article.author}</p>
          <p>Published on {article.date.toISOString()}</p>
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
