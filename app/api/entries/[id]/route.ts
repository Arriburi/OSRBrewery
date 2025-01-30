import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  const { id } = await params;

  try {
    const db = await openDB();
    const entry = await db.get("SELECT * FROM entries WHERE id = ?", Number(id));

    if (!entry) {
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
