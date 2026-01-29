import SellerSidebar from "@/components/seller-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <SellerSidebar />

                <SidebarInset
                    className="
            flex flex-col flex-1
            md:pl-[var(--sidebar-width)]
            md:data-[state=collapsed]:pl-[var(--sidebar-width-collapsed)]">
                    <main className="flex-1 px-6 py-6 overflow-x-hidden">
                        <SidebarTrigger className="mb-4 md:hidden" />
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}