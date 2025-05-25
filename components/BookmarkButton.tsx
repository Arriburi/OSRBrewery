'use client'

import { BsBookmark, BsBookmarkStar } from "react-icons/bs";
import { useState, useEffect } from "react";
import { isBookmarked as checkIsBookmarked, toggleBookmark } from "@/app/actions/bookmarks";

interface BookmarkButtonProps {
  articleId: number;
  userId: number;
}

export default function BookmarkButton({ articleId, userId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarked = await checkIsBookmarked(userId, articleId);
        setIsBookmarked(bookmarked);
      } catch (error) {
        console.error('Error checking bookmark:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmark();
  }, [articleId, userId]);

  const handleToggleBookmark = async () => {
    try {
      const result = await toggleBookmark(userId, articleId);
      if (result.success) {
        setIsBookmarked(result.isBookmarked);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (isLoading) {
    return <div className="w-6 h-6" />; // Placeholder while loading
  }

  return (
    <button
      onClick={handleToggleBookmark}
      className="text-2xl text-muted-foreground hover:text-accent transition-colors"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? <BsBookmarkStar /> : <BsBookmark />}
    </button>
  );
} 