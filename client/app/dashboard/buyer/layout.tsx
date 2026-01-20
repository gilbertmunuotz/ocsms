import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import BuyerSidebar from "@/components/buyer-sidebar"

export default async function BuyerLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider>
      <BuyerSidebar />
      <main className="flex-1 bg-white">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
