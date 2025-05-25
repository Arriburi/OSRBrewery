import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  console.log("THE ID OF THIS IS", id);

  try {
    const { data: entry, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !entry) {
      return NextResponse.json({ error: "Entry not found", id }, { status: 404 });
    }

    const imgSrc = entry.imgSrc ? `/upload/${entry.imgSrc}` : null;

    const article = {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type,
      imgSrc: imgSrc,
      date: new Date(entry.date),
      author: entry.author,
      properties: entry.properties || "{}",
    };

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return NextResponse.json({ error: "Failed to fetch entry" }, { status: 500 });
  }
}
