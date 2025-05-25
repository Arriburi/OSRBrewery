import { Properties } from "@/types/data";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/app/actions/user";
import BookmarkButton from "./BookmarkButton";
import { getUserSession } from "@/app/lib/session";
import { SessionPayload } from "@/app/lib/definitions";
import { supabase } from "@/app/lib/supabase";

interface ArticleProps {
  id: number;
}

const fetchArticleById = async (id: number) => {
  try {
    const { data: entry, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !entry) {
      return null;
    }

    const imgSrc = entry.imgSrc ? `/upload/${entry.imgSrc}` : null;

    const article = {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type,
      imgSrc: imgSrc,
      date: new Date(entry.date).toISOString(),
      author: entry.author,
      properties: entry.properties || "{}",
    };

    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
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
  const userSession = await getUserSession() as SessionPayload;
  const user = await getUser(userSession?.userId);
  console.log("ACI", article);
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground">Article Not Found</h1>
        <p className="mt-4 text-foreground">The article you're looking for doesn't exist.</p>
      </div>
    );
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
          <div className="flex items-center gap-4">
            <h1 className="text-4xl pb-2 font-bold text-foreground break-words">{article.title}</h1>
            {user && <BookmarkButton articleId={id} />}
          </div>
          <div className="flex flex-wrap max-w-[450px]">
            {article.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 mb-1 rounded bg-accent text-black mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right text-sm break-words text-foreground">
          <p>By <Link href={`/profile/${article.author}`} className="hover:text-accent">{article.author}</Link></p>
          <p>Published on {formattedDate}</p>
        </div>
      </div>
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
        {h2Value && <h2 className="text-lg font-semibold text-foreground">{h2Value}</h2>}
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
        <p className="whitespace-pre-wrap">
          {article.description}
        </p>
      </div>
    </div>
  );
}
