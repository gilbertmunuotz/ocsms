"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex gap-4">
          <Link href="/dashboard/vehicles">Vehicles</Link>
          <Link href="/dashboard/seller">Seller</Link>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-red-600"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
