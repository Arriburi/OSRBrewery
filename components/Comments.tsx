'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { User } from '@/app/lib/definitions';
import { formatDistanceToNow } from 'date-fns';
import { useForm } from 'react-hook-form';

type Comment = {
  id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
  };
}

type CommentsProps = {
  articleId: number;
  user: User | null;
}

type CommentFormData = {
  content: string;
}

export default function Comments({ articleId, user }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CommentFormData>();

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id, users!user_id(username)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    setComments(data.map(comment => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      user: {
        username: user?.username || 'Unknown User'
      }
    })));
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const onSubmit = async ({ content }: CommentFormData) => {
    if (!user) return;

    const { error } = await supabase
      .from('comments')
      .insert({
        article_id: articleId,
        user_id: user.id,
        content: content.trim()
      });

    if (!error) {
      reset();
      await fetchComments();
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>

      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register('content', { required: true })}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows={3}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent hover:bg-secondary py-2 px-4 rounded-md text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-foreground/70">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(({ id, content, created_at, user }) => (
            <div key={id} className="bg-primary p-4 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{user.username}</span>
                <span className="text-sm text-foreground/70">
                  {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-foreground">{content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 