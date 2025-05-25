import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, username, email, created_at')
    .eq('username', username)
    .single();

  if (error || !user) {
    notFound();
  }

  return (
    <div className="flex flex-row">
      <div className="flex-1 rounded-md shadow-md bg-primary p-[20px] mr-4 py-8">
        <div className="container mx-auto px-4">
          <UserProfile userid={user.id} />
        </div>
      </div>
    </div>
  );
} 