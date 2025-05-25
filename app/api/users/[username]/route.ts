import { NextResponse } from "next/server";
import { supabase } from '@/app/lib/supabase';

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .eq('username', username)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }

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