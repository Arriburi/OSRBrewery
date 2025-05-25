'use server'

import { supabase } from '../lib/supabase';
import { revalidatePath } from 'next/cache';

export type Comment = {
  id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
  };
}

export async function getComments(articleId: number): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      users!inner(username)
    `)
    .eq('article_id', articleId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return (data || []).map(comment => ({
    id: comment.id,
    content: comment.content,
    created_at: comment.created_at,
    user: {
      username: comment.users[0]?.username || 'Unknown User'
    }
  }));
}

export async function addComment(articleId: number, userId: number, content: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .insert({
      article_id: articleId,
      user_id: userId,
      content: content.trim()
    });

  if (!error) {
    revalidatePath(`/articles/${articleId}`);
  }

  return !error;
} 