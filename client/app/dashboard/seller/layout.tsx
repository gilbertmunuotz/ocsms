import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SellerSidebar from "@/components/seller-sidebar"

export default async function SellerLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <SellerSidebar />
            <main className="flex-1 bg-white">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
