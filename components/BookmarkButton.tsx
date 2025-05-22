'use client'

import { BsBookmark, BsBookmarkStar } from "react-icons/bs";
import { useState, useEffect } from "react";
import { BaseArticle } from "@/types/data";

interface BookmarkButtonProps {
  articleId: number;
}

export default function BookmarkButton({ articleId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const response = await fetch(`/api/bookmarks`);
        const data = await response.json();
        console.log('Bookmarks data:', data);
        // Check if the current article is in the bookmarks list
        const isBookmarked = data.some((bookmark: BaseArticle) => Number(bookmark.id) === Number(articleId));
        console.log('Is bookmarked:', isBookmarked, 'for article:', articleId);
        setIsBookmarked(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmark();
  }, [articleId]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entryId: articleId }),
        });
      } else {
        await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entryId: articleId }),
        });
      }
      console.log('Toggling bookmark state from:', isBookmarked, 'to:', !isBookmarked);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (isLoading) {
    return <div className="w-6 h-6" />; // Placeholder while loading
  }

  console.log('Current bookmark state:', isBookmarked);
  return (
    <button
      onClick={toggleBookmark}
      className="text-2xl"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? <BsBookmarkStar className="text-accent" /> : <BsBookmark className="text-white" />}
    </button>
  );
} 