"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard/admin" },
  { name: "Vehicles", href: "/dashboard/admin/vehicles" },
  { name: "Users", href: "/dashboard/admin/users" },
  { name: "Inquiries", href: "/dashboard/admin/inquiries" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
      <h1 className="text-xl tracking-widest text-red-600 mb-10">
        ADMIN
      </h1>

      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-sm transition
              ${
                pathname === link.href
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
