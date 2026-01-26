import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6 bg-zinc-950 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
