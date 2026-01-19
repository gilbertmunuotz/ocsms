import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="min-h-screen flex bg-[#111111]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F1F1F] p-6">
        <h2 className="text-xl font-bold text-[#DA291C] mb-6">
          Dashboard
        </h2>

        <nav className="space-y-3 text-sm">
          <p className="text-gray-400">
            Role:{" "}
            <span className="text-white font-medium">
              {session.user.role}
            </span>
          </p>

          <a className="block hover:text-[#DA291C]" href="/dashboard">
            Overview
          </a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
