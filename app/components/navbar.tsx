"use client";

import Link from "next/link";
import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Home,
  Languages,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Mobile menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/dashboard", label: "Home", icon: <Home size={18} /> },
    { href: "/translate", label: "Translate", icon: <Languages size={18} /> },
    { href: "/contribute", label: "Contribute", icon: <Sparkles size={18} /> },
  ];

  return (
    <nav className="bg-emerald-50/50 dark:bg-neutral-900 border-b border-emerald-200 dark:border-neutral-700 px-4 sm:px-6 py-3 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/taf.png"
              alt="Tafsiri Logo"
              width={140}
              height={36}
              priority
              className="w-28 sm:w-32 md:w-36"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <span className="mr-2 text-emerald-500 group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span className="tracking-tight">{link.label}</span>
            </Link>
          ))}

          {user && (
            <Link
              href="/profile"
              className="group flex items-center text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <span className="mr-2 text-emerald-500 group-hover:scale-110 transition-transform">
                <User size={18} />
              </span>
              <span className="tracking-tight">Dashboard</span>
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 group focus:outline-none"
                aria-label="User profile"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-neutral-900"></div>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  } text-neutral-600 dark:text-neutral-300`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden animate-fadeIn">
                  <div className="p-4 border-b border-emerald-100 dark:border-neutral-700">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Signed in as
                    </p>
                    <p className="font-medium text-neutral-800 dark:text-white truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-emerald-50 dark:hover:bg-neutral-700/50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} className="mr-3 text-emerald-500" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-emerald-600 dark:text-emerald-400 focus:outline-none p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Mobile menu"
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
      <div
        ref={menuRef}
        className={`md:hidden bg-white dark:bg-neutral-900 transition-all duration-300 ease-in-out overflow-y-auto z-40 ${
          isMenuOpen
            ? "opacity-100 translate-y-0 min-h-96"
            : "opacity-0 translate-y-full pointer-events-none fixed inset-x-0 top-[65px] bottom-0"
        }`}
      >
        <div className="space-y-3 px-4 py-6">
          {user && (
            <div className="flex items-center p-3 rounded-lg bg-emerald-100 dark:bg-neutral-800 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium mr-3">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-white">
                  {displayName}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center p-3 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-emerald-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3 text-emerald-500">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {user && (
            <Link
              href="/profile"
              className="flex items-center p-3 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-emerald-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3 text-emerald-500">
                <User size={18} />
              </span>
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors mt-4"
            >
              <span className="mr-3">
                <LogOut size={18} />
              </span>
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Link
                href="/login"
                className="text-center py-3 px-4 rounded-lg border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-neutral-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/login"
                className="text-center py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
