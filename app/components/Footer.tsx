"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Mail, Phone, User } from "lucide-react";
import { Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  useEffect(() => {
    const orb = document.querySelector(".orb") as HTMLDivElement;
    const handleMouseMove = (e: MouseEvent) => {
      if (orb) {
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path d="M19.635 3H16.65l-4.44 5.256L7.2 3H2l7.323 9.012L2.09 21H5.07l4.68-5.536L16.8 21h5.2l-7.56-9.215L19.635 3zM6.72 4.742l9.99 12.133H16.8L6.72 4.742z" />
    </svg>
  );

  return (
    <footer className="relative bg-gradient-to-r from-green-500/20 via-green-600/20 to-emerald-700/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-800 text-neutral-800 dark:text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 dark:bg-green-500 rounded-full filter blur-3xl animate-float1" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400 dark:bg-purple-500 rounded-full filter blur-3xl animate-float2" />
        <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-cyan-400 dark:bg-cyan-500 rounded-full filter blur-3xl animate-float3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div>
            <Image
              src="/taf.png"
              alt="Tafsiri Logo"
              width={274}
              height={66}
              priority
            />
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-600 dark:from-cyan-400 dark:to-green-500 mb-4">
              The Tafsiri Project
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A community initiative preserving Kenya’s native languages through
              open collaboration and technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
              >
                <XIcon />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/translate"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Translate
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <p>Email</p>
                <a
                  href="mailto:thetafsiriproject@gmail.com"
                  className="text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  thetafsiriproject@gmail.com
                </a>
              </li>
              <li>
                <p>Phone</p>
                <a
                  href="tel:+254700000000"
                  className="text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  +254 711 372 214
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We’d love to hear from you.
            </p>
            <form className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} The Tafsiri Project. Built by{" "}
            <a
              href="https://ketertitus.info/"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Keter Titus
            </a>
            .
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="orb absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-500/10 to-purple-500/10 filter blur-3xl pointer-events-none" />

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15px, 15px);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, -20px);
          }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
