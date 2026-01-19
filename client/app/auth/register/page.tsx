"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("buyer");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    // 🔧 TEMP: frontend-only mock
    alert("Registration successful! Please login.");
    router.push("/login");
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-4 text-center">
        Create Account
      </h1>

      <form onSubmit={handleRegister} className=" space-y-4">
        <input className="border p-2 w-full" placeholder="Full Name" />
        <input className="border p-2 w-full" placeholder="Email" />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
        />

        <select
          className="border p-2 w-full "
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option className="text-black" value="buyer">Buyer</option>
          <option className="text-black" value="seller">Seller</option>
        </select>

        <button className="bg-black text-white w-full py-2">
          Register
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </>
  );
}
