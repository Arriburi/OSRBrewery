'use client'

import { BsBookmark, BsBookmarkStar } from "react-icons/bs";
import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked as checkIsBookmarked } from "@/app/actions/bookmarks";

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

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(userId, articleId);
      } else {
        await addBookmark(userId, articleId);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (isLoading) {
    return <div className="w-6 h-6" />; // Placeholder while loading
  }

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