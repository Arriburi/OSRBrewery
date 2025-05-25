'use server'

import { supabaseAdmin } from "@/app/lib/supabase";
import { getImageSrc } from "@/app/lib/defaultImages";
import { getUser } from "./user";

export async function getArticleById(id: number) {
  const { data: entry, error } = await supabaseAdmin
    .from('entries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !entry) {
    return null;
  }

  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    tags: JSON.parse(entry.tags || "[]"),
    type: entry.type,
    imgSrc: getImageSrc(entry.imgSrc, entry.type),
    date: new Date(entry.date).toISOString(),
    author: entry.author,
    properties: entry.properties || "{}",
  };
}

export async function deleteArticle(articleId: number, userId: number) {
  try {
    // First get the article to check ownership
    const { data: article, error: fetchError } = await supabaseAdmin
      .from('entries')
      .select('author')
      .eq('id', articleId)
      .single();

    if (fetchError) {
      throw new Error('Failed to fetch article');
    }

    // Get the user to check username
    const user = await getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is the author
    if (article.author !== user.username) {
      throw new Error('Unauthorized to delete this article');
    }

    // Delete the article
    const { error: deleteError } = await supabaseAdmin
      .from('entries')
      .delete()
      .eq('id', articleId);

    if (deleteError) {
      throw new Error('Failed to delete article');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete article'
    };
  }
} 