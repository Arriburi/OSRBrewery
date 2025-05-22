import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}
export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const db = await openDB();
    const user = await db.get(
      "SELECT id, username, email, created_at FROM users WHERE username = ?",
      username
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("Raw created_at from DB:", user.created_at);

    const formattedUser = {
      ...user,
      created_at: user.created_at || new Date().toISOString() // Fallback to current date if null
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
} 