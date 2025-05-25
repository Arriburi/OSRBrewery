import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import { getImageSrc } from '@/app/lib/defaultImages';
import { SessionPayload } from '@/app/lib/definitions';
import { supabase } from "@/app/lib/supabase";

export async function GET() {
  const userSession = await getUserSession() as SessionPayload;
  console.log(userSession);
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { data: bookmarks, error } = await supabase
      .from('bookmarks')
      .select(`
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
      .eq('user_id', userSession.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedBookmarks = bookmarks
      .map(bookmark => {
        const entry = Array.isArray(bookmark.entries) ? bookmark.entries[0] : bookmark.entries;
        if (!entry) return null;
        return {
          ...entry,
          imgSrc: getImageSrc(entry.imgSrc, entry.type),
          tags: JSON.parse(entry.tags || "[]")
        };
      })
      .filter(Boolean);

    return NextResponse.json(formattedBookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userSession = await getUserSession() as SessionPayload;
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entryId } = await request.json();
  if (!entryId) {
    return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('bookmarks')
    .insert([
      { user_id: userSession.userId, entry_id: entryId }
    ]);

  if (error) {
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const userSession = await getUserSession() as SessionPayload;
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { entryId } = await request.json();
  if (!entryId) {
    return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userSession.userId)
    .eq('entry_id', entryId);

  if (error) {
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 