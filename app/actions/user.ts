import { User } from "../lib/definitions";
import { supabaseAdmin } from "../lib/supabase";

export const getUser = async (userId: number): Promise<User | null> => {
  const { data: userdb, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !userdb) {
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

