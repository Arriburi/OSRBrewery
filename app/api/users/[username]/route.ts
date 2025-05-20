import { NextResponse, NextRequest } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
} 