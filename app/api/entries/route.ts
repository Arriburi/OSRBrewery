import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { ArticleType, BaseArticle } from "@/types/data";
import { getUser } from "@/app/actions/user";
import { getImageSrc } from "@/app/lib/defaultImages";
import { getUserSession } from "@/app/lib/session";
import { SessionPayload } from "@/app/lib/definitions";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

export async function GET(): Promise<NextResponse<BaseArticle[] | { error: string }>> {
  try {
    const db = await openDB();
    const entries = await db.all('SELECT * FROM entries');

    const articles = entries.map((entry): BaseArticle => ({
      id: Number(entry.id),
      title: entry.title,
      description: entry.description,
      tags: JSON.parse(entry.tags || "[]"),
      type: entry.type as ArticleType,
      imgSrc: getImageSrc(entry.imgSrc, entry.type as ArticleType) || undefined,
      date: new Date(entry.date),
      author: entry.author,
      properties: JSON.parse(entry.properties || "{}")
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
    const formData = await request.formData();
    const userSession = await getUserSession() as SessionPayload;

    console.log("The body:", formData);

    const user = await getUser(userSession.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const type = formData.get("type") as ArticleType;
    const title = formData.get("title") as string;
    const image = formData.get("imgSrc") as File;
    const description = formData.get("description") as string;
    const properties = formData.get('properties') as string;
    const tags = formData.get("tags") as string;

    // Validate required fields
    if (!title || !description || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | null = null;

    if (image && image.size > 0) {
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
      tags || "[]",
      type,
      imagePath,
      new Date().toISOString(),
      user.username,
      properties || "{}",
    ];

    const result = await db.run(query, values);

    return NextResponse.json({
      success: true,
      articleId: result.lastID
    });
  } catch (error) {
    console.error("Error saving entry:", error);
    return NextResponse.json(
      { error: "Failed to save entry" },
      { status: 500 }
    );
  }
}


