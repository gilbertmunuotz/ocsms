import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin-sidebar"

export default async function AdminLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="flex-1 bg-white">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
