import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
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

async function openDB() {
  return open({
    filename: './app/db/database.db',
    driver: sqlite3.Database,
  });
}

export async function getArticlesForUser(userid: number | null): Promise<Article[]> {
  if (!userid) {
    return [];
  }

  try {
    const db = await openDB();
    const user = await getUser(userid);

    if (!user) {
      return [];
    }

    const articles = await db.all('SELECT * FROM entries WHERE author = ? ORDER BY date DESC', [user.username]);

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
