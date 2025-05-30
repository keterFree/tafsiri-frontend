"use client";

import Link from "next/link";
import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { deleteCookie } from "cookies-next";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

 const handleLogout = async () => {
  try {
    await signOut(auth);
    deleteCookie("authToken");
    router.push("/"); // Redirect immediately
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-4 bg-white dark:bg-neutral-900 border-b border-green-700">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link href="/" aria-label="Home">
          <Image
            src="/taf.png" // Ensure this image has a rectangular aspect
            alt="Tafsiri Logo"
            width={160}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/translate"
          className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          Translate
        </Link>
        {user && (
          <Link
            href="/profile"
            className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            Profile
          </Link>
        )}
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="border-red-600 border hover:bg-red-500 text-red-800 hover:text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Auth - stacked under logo */}
      <div className="md:hidden flex items-center space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="border-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
