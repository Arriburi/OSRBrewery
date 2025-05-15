
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import styles from "./Navbar.module.css";
import { SessionPayload } from "@/app/lib/definitions";
import { logout } from "@/app/actions/auth";

export default function Navbar({ user }: { user: SessionPayload | null }) {
  // TODO: Replace with actual auth state
  const isLoggedIn = user ? true : false;


  return (
    <div>
      <nav className="pr-2 flex font-bold items-center space-x-6 text-base leading-5">
        <Link href="/" className="hover:underline">Home</Link>
        {isLoggedIn && (
          <Link href="/upload" className="hover:underline">Upload</Link>
        )}
        <Link href="/about" className="hover:underline">About</Link>

        {isLoggedIn ? (
          <ProfileButton />
        ) : (
          <Link href="/login" className="hover:opacity-80 transition-opacity">
            <BsPersonCircle className="text-2xl" />
          </Link>
        )}
      </nav>

      {isLoggedIn && (
        <ProfilePopover />
      )}
    </div>
  );
}

const ProfileButton = () => {
  return (
    <button
      popoverTarget="profile-menu"
      popoverTargetAction="toggle"
      className={`hover:opacity-80 transition-opacity ${styles.anchor}`}
    >
      <BsPersonCircle className="text-2xl" />
    </button>
  );
};

const ProfilePopover = () => {
  return (
    <div
      id="profile-menu"
      popover="auto"
      className={`w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${styles.popover}`}
    >
      <div className="py-1" role="menu">
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          View Profile
        </Link>
        <button
          onClick={logout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Logout

        </button>
      </div>
    </div>
  )
}