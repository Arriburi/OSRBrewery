'use server'

import { getImageSrc } from '../lib/defaultImages';
import { Article } from './articles';
import { supabaseAdmin } from '../lib/supabase';
import { ArticleType } from '@/types/data';
import { revalidatePath } from 'next/cache';

interface BookmarkEntry {
  entry_id: number;
  entries: {
    id: number;
    title: string;
    description: string;
    tags: string;
    type: ArticleType;
    imgSrc: string | null;
    date: string;
    author: string;
    properties: string;
  }
}

export async function getBookmarks(userId: number): Promise<Article[]> {
  const { data: bookmarks, error } = await supabaseAdmin
    .from('bookmarks')
    .select(`
      entry_id,
      entries (
        id,
        title,
        description,
        tags,
        type,
        imgSrc,
        date,
        author,
        properties
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }

  return (bookmarks as unknown as BookmarkEntry[]).map(bookmark => ({
    id: bookmark.entries.id,
    title: bookmark.entries.title,
    description: bookmark.entries.description,
    tags: JSON.parse(bookmark.entries.tags || "[]"),
    type: bookmark.entries.type,
    imgSrc: getImageSrc(bookmark.entries.imgSrc, bookmark.entries.type) || undefined,
    date: bookmark.entries.date,
    author: bookmark.entries.author,
    properties: JSON.parse(bookmark.entries.properties || "{}")
  }));
}

export async function addBookmark(userId: number, entryId: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('bookmarks')
    .insert({
      user_id: userId,
      entry_id: entryId
    });

  return !error;
}

export async function removeBookmark(userId: number, entryId: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('entry_id', entryId);

  return !error;
}

export async function isBookmarked(userId: number, entryId: number): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_id', entryId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}

export async function toggleBookmark(userId: number, entryId: number): Promise<{ success: boolean; isBookmarked: boolean }> {
  const isCurrentlyBookmarked = await isBookmarked(userId, entryId);

  if (isCurrentlyBookmarked) {
    const success = await removeBookmark(userId, entryId);
    if (success) {
      revalidatePath('/profile/*');
      revalidatePath('/articles/*');
    }
    return { success, isBookmarked: false };
  } else {
    const success = await addBookmark(userId, entryId);
    if (success) {
      revalidatePath('/profile/*');
      revalidatePath('/articles/*');
    }
    return { success, isBookmarked: true };
  }
}






