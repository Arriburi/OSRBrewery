import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getImageSrc } from '@/app/lib/defaultImages';
import { SessionPayload } from '@/app/lib/definitions';

async function openDB() {
  return open({
    filename: './app/db/database.db',
    driver: sqlite3.Database,
  });
}

// GET: Get bookmarks for a specific user
export async function GET() {
  const userSession = await getUserSession() as SessionPayload;
  console.log(userSession);
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
  `, [userSession.userId]);

    const formattedBookmarks = bookmarks.map(bookmark => ({
      ...bookmark,
      imgSrc: getImageSrc(bookmark.imgSrc, bookmark.type),
      tags: JSON.parse(bookmark.tags || "[]")
    }));

    return NextResponse.json(formattedBookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add bookmark for current user
export async function POST(request: Request) {
  const userSession = await getUserSession() as SessionPayload;
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entryId } = await request.json();
  if (!entryId) {
    return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
  }

  const db = await openDB();
  await db.run('INSERT INTO bookmarks (user_id, entry_id) VALUES (?, ?)', [userSession.userId, entryId]);
  return NextResponse.json({ success: true });
}

// DELETE: Remove bookmark for current user
export async function DELETE(request: Request) {
  const userSession = await getUserSession() as SessionPayload;
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entryId } = await request.json();
  if (!entryId) {
    return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
  }

  const db = await openDB();
  await db.run('DELETE FROM bookmarks WHERE user_id = ? AND entry_id = ?', [userSession.userId, entryId]);
  return NextResponse.json({ success: true });
} 