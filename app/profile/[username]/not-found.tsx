import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 rounded-md shadow-md bg-primary p-[20px] mr-4 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="mb-4">The user you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 