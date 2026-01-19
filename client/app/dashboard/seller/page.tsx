"use client";

import { useSession } from "next-auth/react";

export default function SellerPage() {
  const { data: session } = useSession();

  if (session?.user.role !== "seller") {
    return <p className="text-red-500">Access denied</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Seller Dashboard
      </h1>

      <p>Manage your vehicle listings</p>

      <button className="mt-4 bg-black text-white px-4 py-2">
        Add Vehicle
      </button>
    </div>
  );
}
