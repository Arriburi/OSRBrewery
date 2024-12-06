'use client'

import { BaseArticle } from "../types/data";
import { KeyValue } from "../types/data";
import { useState, useEffect } from "react";
import { getArticleById } from "../helpers/backend";

interface ArticleProps {
  id: string;
}

function createPropertyDiv(property: KeyValue) {
  return (
    <div>
      <b>{property.key}: </b>{property.value}
    </div>
  );
}


export default function Article({ id }: ArticleProps) {

  const [article, setArticle] = useState<BaseArticle | null>(null)

  useEffect(() => {
    setArticle(getArticleById(id));
  }, [])

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
