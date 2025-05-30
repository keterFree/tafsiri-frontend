"use client";

import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { setCookie } from "cookies-next";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthForm() {
  const searchParams = useSearchParams();         // ✅ use inside component
  const router = useRouter();                     // ✅ use inside component
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const token = await userCredential.user.getIdToken();
      setCookie("authToken", token);

      router.push(redirectTo); // ✅ redirect after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setCookie("authToken", token);

      router.push(redirectTo); // ✅ redirect after Google login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
               <Image
            src="/taf.png" // Ensure this image has a rectangular aspect
            alt="Tafsiri Logo"
            width={160}
            height={40}
            priority
          />
              <h1 className="text-2xl text-black font-semibold">
                {isLogin ? "Login" : "Register"}
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="divide-y divide-neutral-200 mt-6"
            >
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-neutral-900 focus:outline-none focus:border-green-600"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-neutral-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-neutral-600"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-neutral-900 focus:outline-none focus:border-green-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-neutral-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-neutral-600"
                  >
                    Password
                  </label>
                </div>

                {error && (
                  <div className="text-red-600 text-sm mt-1">{error}</div>
                )}

                <div className="flex justify-between flex-col items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    {isLogin ? "Login" : "Register"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-green-700 underline hover:text-green-900 transition"
                  >
                    {isLogin
                      ? "Need an account? Register"
                      : "Already have an account? Login"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 w-full flex justify-center">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center bg-white border border-neutral-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              >
                <FcGoogle className="h-6 w-6 mr-2" />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
