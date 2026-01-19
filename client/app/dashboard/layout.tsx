"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex gap-4">
          {/* Buyer links */}
          <Link href="/dashboard/vehicles">Vehicles</Link>

          {/* Seller links */}
          {role === "seller" && (
            <>
              <Link href="/dashboard/seller">My Vehicles</Link>
              <Link href="/dashboard/seller/inquiries">Inquiries</Link>
            </>
          )}

          {/* Admin links */}
          {role === "admin" && (
            <>
              <Link href="/dashboard/admin">Admin</Link>
              <Link href="/dashboard/admin/users">Users</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 capitalize">
            {role}
          </span>

          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
