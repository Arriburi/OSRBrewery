import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

// GET
export async function GET() {
  try {
    const db = await openDB();
    const entries = await db.all("SELECT * FROM entries");

    const articles = entries.map((entry) => ({
      id: entry.id.toString(),
      title: entry.title,
      text: entry.text,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type,
      imgSrc: entry.imgSrc || null,
      date: new Date(entry.date),
      author: entry.author,
      properties: JSON.parse(entry.properties || "{}"),
    }));

    return NextResponse.json(articles); // Send JSON response
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
