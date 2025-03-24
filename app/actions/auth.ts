'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcrypt';
import sqlite3 from "sqlite3";
import { open } from "sqlite";


async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  });
}

export async function signup(state: FormState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { username, email, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const db = await openDB();

    const result = await db.run(
      `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    return {
      message: 'Account created successfully!',
      userId: result.lastID
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('UNIQUE constraint failed')) {
      if (errorMessage.includes('email')) {
        return {
          errors: {
            email: ['This email is already in use']
          }
        }
      }
      if (errorMessage.includes('username')) {
        return {
          errors: {
            username: ['This username is already taken']
          }
        }
      }
    }
  }
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const db = await openDB();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return {
        errors: {
          email: ['No account found with this email'],
        },
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return {
        errors: {
          password: ['Incorrect password'],
        },
      };
    }

    return {
      message: 'Login successful!',
      userId: user.id,
    };

  } catch (error: unknown) {
    console.error('Login error:', error);
    return {
      message: 'An error occurred during login.',
    };
  }
}