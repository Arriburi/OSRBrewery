'use server'

import { supabase } from '../lib/supabase';
import { getUser } from './user';
import { getImageSrc } from '../lib/defaultImages';
import { ArticleType, Properties, BaseArticle } from '@/types/data';
import { getUserSession } from '@/app/lib/session';
import { STORAGE_CONFIG } from '../lib/storage';

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

export async function createArticle(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Validate required fields
    if (!title?.trim() || !description?.trim()) {
      return {
        success: false,
        error: 'Title and description are required'
      };
    }

    const tags = JSON.parse(formData.get('tags') as string);
    const type = formData.get('type') as ArticleType;
    const properties = formData.get('properties') ? JSON.parse(formData.get('properties') as string) : {};
    const imgFile = formData.get('imgSrc') as File;

    const userSession = await getUserSession();
    const user = await getUser(userSession!.userId);

    let imgSrc = null;
    if (imgFile) {
      const fileExt = imgFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      // Convert File to ArrayBuffer
      const arrayBuffer = await imgFile.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_CONFIG.BUCKET_NAME)
        .upload(fileName, arrayBuffer, {
          contentType: imgFile.type
        });

      if (uploadError) {
        throw new Error('Failed to upload image');
      }

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_CONFIG.BUCKET_NAME)
        .getPublicUrl(fileName);

      imgSrc = fileName; // Store just the filename, not the full URL
    }

    const { data, error } = await supabase
      .from('entries')
      .insert({
        title,
        description,
        tags: JSON.stringify(tags),
        type,
        properties: JSON.stringify(properties),
        author: user?.username,
        date: new Date().toISOString(),
        imgSrc
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating article:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create article' };
  }
}

export async function getAllArticles(): Promise<BaseArticle[]> {
  try {
    const { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    return entries.map((entry): BaseArticle => ({
      id: Number(entry.id),
      title: entry.title,
      description: entry.description,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type as ArticleType,
      imgSrc: getImageSrc(entry.imgSrc, entry.type as ArticleType) || undefined,
      date: new Date(entry.date),
      author: entry.author,
      properties: JSON.parse(entry.properties || "{}")
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
