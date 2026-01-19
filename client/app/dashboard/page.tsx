"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    switch (session.user.role) {
      case "admin":
        redirect("/dashboard/admin");
      case "seller":
        redirect("/dashboard/seller");
      default:
        redirect("/dashboard/vehicles");
    }
  }, [status, session]);

  return <p className="p-6">Loading dashboard...</p>;
}
