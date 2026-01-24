import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDevSession } from "@/lib/devSession";

export default async function DashboardPage() {
  const session = (await auth()) ?? getDevSession();

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user.role;

  if (role === "ADMIN") redirect("/dashboard/admin");
  if (role === "SELLER") redirect("/dashboard/seller");
  if (role === "BUYER") redirect("/dashboard/buyer");

  redirect("/auth/login");
}
