"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (session?.user.role !== "admin") {
    return <p className="text-red-500">Access denied</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Admin Dashboard
      </h1>

      <ul className="list-disc pl-6">
        <li>Manage users</li>
        <li>Manage vehicles</li>
        <li>View inquiries</li>
      </ul>
    </div>
  );
}
