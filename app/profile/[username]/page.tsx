import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const response = await fetch(`http://localhost:3000/api/users/${username}`);
  const user = await response.json();
  if (!response.ok) {
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