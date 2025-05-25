'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteArticle } from '@/app/actions/article';
import { BsTrash } from 'react-icons/bs';

interface DeleteButtonProps {
  articleId: number;
  userId: number;
}

export default function DeleteButton({ articleId, userId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        setIsDeleting(true);
        try {
          const result = await deleteArticle(articleId, userId);
          if (result.success) {
            router.push('/');
            router.refresh();
          } else {
            alert(result.error || 'Failed to delete article');
          }
        } catch (error) {
          console.error('Error deleting article:', error);
          alert('Failed to delete article');
        } finally {
          setIsDeleting(false);
        }
      }}
      disabled={isDeleting}
      className="text-2xl text-muted-foreground hover:text-red-600 transition-colors"
      aria-label="Delete article"
    >
      <BsTrash />
    </button>
  );
} 