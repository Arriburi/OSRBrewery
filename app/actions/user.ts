import { User } from "../lib/definitions";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

export const getUser = async (userId: number): Promise<User | null> => {
  const db = await openDB()
  const userdb = await db.get('SELECT * FROM users WHERE id = ?', userId)

  if (!userdb) {
    return null;
  }

  const user: User = {
    id: userId,
    username: userdb.username,
    email: userdb.email,
    created_at: userdb.created_at
  }
  return user;
}

