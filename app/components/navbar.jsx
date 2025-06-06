"use client";

import Link from "next/link";
import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icons if using lucide-react

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie("authToken");
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-emerald-50/50 dark:bg-neutral-900 border-b border-green-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/taf.png"
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
          </Link><Link
              href="/contribute"
              className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              contribute
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
          {user && (
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              Welcome, {displayName}
            </span>
          )}
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

        {/* Hamburger Menu (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-green-600 dark:text-green-400 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {user && (
            <span className="block text-neutral-700 dark:text-neutral-300 font-medium">
              Welcome, {displayName}
            </span>
          )}
          <Link
            href="/dashboard"
            className="block text-neutral-700 dark:text-neutral-200"
          >
            Dashboard
          </Link>
          <Link
            href="/translate"
            className="block text-neutral-700 dark:text-neutral-200"
          >
            Translate
          </Link>
          {user && (
            <Link
              href="/profile"
              className="block text-neutral-700 dark:text-neutral-200"
            >
              Profile
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left border border-red-600 text-red-700 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-green-600 hover:underline"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="block bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
