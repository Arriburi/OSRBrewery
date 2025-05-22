import { getImageSrc } from '../lib/defaultImages';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Article } from './articles';


function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}


export async function getBookmarks(userid: number | null): Promise<Article[]> {

  console.log(userid);
  if (!userid) {
    return [];
  }

  try {
    const db = await openDB();
    const bookmarks = await db.all(`
      SELECT e.* 
      FROM bookmarks b 
      JOIN entries e ON b.entry_id = e.id 
      JOIN users u ON b.user_id = u.id
      WHERE u.id = ?
      ORDER BY e.date DESC    
    `, [userid]);

    // Format the response to include the /upload/ prefix for images
    const formattedBookmarks = bookmarks.map(bookmark => ({
      ...bookmark,
      imgSrc: getImageSrc(bookmark.imgSrc, bookmark.type),
      tags: JSON.parse(bookmark.tags || "[]")
    }));
    return formattedBookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}






