import { supabase } from '@/app/lib/supabase';
import { getUser } from './user';
import { getImageSrc } from '../lib/defaultImages';
import { ArticleType, Properties } from '@/types/data';

export interface Article {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  imgSrc?: string;
  type: ArticleType;
  author: string;
  properties: Properties;
}

export async function getArticlesForUser(userid: number | null): Promise<Article[]> {
  if (!userid) {
    return [];
  }

  try {
    const user = await getUser(userid);

    if (!user) {
      return [];
    }

    const { data: articles, error } = await supabase
      .from('entries')
      .select('*')
      .eq('author', user.username)
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching user articles:", error);
      return [];
    }

    if (!articles) {
      return [];
    }

    return articles.map(article => ({
      ...article,
      imgSrc: getImageSrc(article.imgSrc, article.type as ArticleType),
      tags: JSON.parse(article.tags || "[]"),
      properties: JSON.parse(article.properties || "{}")
    }));
  } catch (error) {
    console.error("Error fetching user articles:", error);
    return [];
  }
}
