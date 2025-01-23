import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex font-bold items-center space-x-6 text-base leading-5">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/profile" className="hover:underline">Profile</Link>
      <Link href="/upload" className="hover:underline">Upload</Link>
      <Link href="/about" className="hover:underline">About</Link>
    </nav>
  )
};
