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

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};



export default async function Article({ id }: ArticleProps) {

  const article = await fetchArticleById(id);
  console.log("ACI", article);
  console.log(article.imgSrc);

  if (article == null) {
    return <div>Loading...</div>
  }

  const formattedDate = formatDate(article.date);

  const properties = JSON.parse(article.properties) as Properties;
  const possibleHeadingKeys = ['School', 'Creature Type'] as const;
  const [h2Key] = possibleHeadingKeys.filter(key => key in properties);
  const h2Value = h2Key ? properties[h2Key] : null;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl pb-2 font-bold text-foreground break-words">{article.title} </h1>
          <div className="flex flex-wrap max-w-[450px]">
            {article.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 mb-1 rounded bg-accent text-black mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right text-sm break-words text-foreground">
          <p>By {article.author}</p>
          <p>Published on {formattedDate}</p>
        </div>
      </div >
      {article.imgSrc && (
        <Image
          src={article.imgSrc}
          width={350}
          height={350}
          layout="intrinsic"
          alt={article.title}
          className="mt-8 mb-4"
        />
      )}
      <div className="divide-y divide-background pb-5">
        {h2Value && <h2 className="text-lg text-foreground">{h2Value}</h2>}
        <div className="divide-y text-foreground dark:divide-background" >
          {Object.entries(properties)
            .filter(([key]) => key !== h2Key)
            .map(([key, value]) => (
              <div key={key}>
                <b>{key}: </b>{value}
              </div>
            ))}
        </div>
      </div>
      <div className="prose max-w-none pb-8">
        <p>
          {article.description}
        </p>
      </div>
    </div>
  );
}
