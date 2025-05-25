import { createClient } from '@supabase/supabase-js'

// Client-side Supabase instance with limited permissions
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)

// Server-side Supabase instance with admin privileges
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Make sure to add this to your .env file
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  }
) 