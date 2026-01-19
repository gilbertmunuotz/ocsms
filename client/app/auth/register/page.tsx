"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white tracking-widest mb-2">
            PRANCING HORSE
          </h1>
          <div className="w-16 h-0.5 bg-red-600 mx-auto"></div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
          <h2 className="text-2xl font-light text-white mb-8 tracking-wide">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-sm 
                         focus:outline-none focus:border-red-600 transition-colors duration-300
                         placeholder-zinc-500"
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-sm 
                         focus:outline-none focus:border-red-600 transition-colors duration-300
                         placeholder-zinc-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-light tracking-widest 
                       py-3 rounded-sm transition-all duration-300 uppercase text-sm
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Register
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm text-center">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-red-600 hover:text-red-500 transition-colors font-light"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        <p className="text-zinc-600 text-xs text-center mt-8 tracking-wide">
          PERFORMANCE • LUXURY • PRECISION
        </p>
      </div>
    </div>
  );
}
