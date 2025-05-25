import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ArticleType, BaseArticle } from "@/types/data";
import { getUser } from "@/app/actions/user";
import { getImageSrc } from "@/app/lib/defaultImages";
import { getUserSession } from "@/app/lib/session";
import { SessionPayload } from "@/app/lib/definitions";
import { supabase } from "@/app/lib/supabase";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error in GET /api/entries:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const userSession = await getUserSession() as SessionPayload;

    if (!userSession) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

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

      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(finalPath, buffer);
      imagePath = tempPath;
    }

    const entryData = {
      title,
      description,
      tags: tags || "[]",
      type,
      imgSrc: imagePath,
      date: new Date().toISOString(),
      author: user.username,
      properties: properties || "{}"
    };

    console.log("Attempting to insert entry:", entryData);

    const { data, error } = await supabase
      .from('entries')
      .insert(entryData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error details:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      articleId: data.id
    });
  } catch (error) {
    console.error("Error in POST /api/entries:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create entry" },
      { status: 500 }
    );
  }
}


