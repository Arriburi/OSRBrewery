import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { ArticleType, Properties } from "@/types/data";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

type Article = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: string;
  imgSrc: string | null;
  date: Date;
  author: string;
  properties: Properties;
};

export async function GET() {
  try {
    const db = await openDB();
    const entries = await db.all("SELECT * FROM entries");

    const default_images: Record<ArticleType, string> = {
      "Default": "/default/default-article.svg",
      "Spell": "/default/default-spell.svg",
      "Monster": "/default/default-monster.svg",
      "Adventure": "/default/default-adventure.svg",
      "Map": "/default/default-map.svg",
      "Magic Item": "/default/default-magic-item.svg",
      "Encounter": "/default/default-encounter.svg",
      "Other": "/default/default-other.svg"
    };

    const articles = entries.map((entry): Article => ({
      id: entry.id.toString(),
      title: entry.title,
      description: entry.description,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type,
      imgSrc: entry.imgSrc ? `/upload/${entry.imgSrc}` : default_images[entry.type as ArticleType],
      date: new Date(entry.date),
      author: entry.author,
      properties: entry.properties || "{}"
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const db = await openDB();
    const formData = await request.formData(); //this JSON

    console.log("The body:", formData);

    const defaultAuthor = "Anonymous";
    const type = formData.get("type") as ArticleType;
    const title = formData.get("title") as string;
    const image = formData.get("imgSrc") as File;
    const description = formData.get("description") as string;
    const properties = formData.get('properties');
    const tags = formData.get("tags");


    let imagePath: string | null = null;

    if (image !== null) {
      const tempPath = image.name;
      const publicPath = path.join(process.cwd(), "public", "upload");
      const finalPath = path.join(publicPath, tempPath);
      console.log("The final path" + finalPath);


      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(finalPath, buffer);
      imagePath = tempPath;
    }

    const query = "INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [
      title,
      description,
      tags,
      type,
      imagePath,
      new Date().toISOString(),
      defaultAuthor,
      properties,
    ];

    await db.run(query, values)

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving entry:", error);
    return Response.json({ error: "Failed to save entry" }, { status: 500 });
  }

}


