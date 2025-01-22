import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

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

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

//POST
export async function POST(request: Request) {
  try {
    const db = await openDB();
    const formData = await request.formData(); //this JSON

    console.log("The body:", formData);

    const defaultAuthor = "Anonymous";

    const image = formData.get("imgSrc") as File;
    const title = formData.get("title");
    const text = formData.get("text");
    const tags = formData.get("tags");
    const type = formData.get("type");
    const properties = formData.get("properties");

    const date = new Date();


    console.log(title);
    console.log(text);
    console.log(tags);
    console.log(type);
    console.log(properties);


    const tempPath = image.name;
    const publicPath = path.join(process.cwd(), "public", "upload");
    const finalPath = path.join(publicPath, tempPath);


    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(finalPath, buffer);

    await db.run(
      "INSERT INTO entries (title, text, tags, type, imgSrc, date, author, properties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      title,
      text,
      tags,
      type,
      image.name,
      new Date().toISOString(),
      defaultAuthor,
      properties
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving entry:", error);
    return NextResponse.json({ error: "Failed to save entry" }, { status: 500 });
  }

}

