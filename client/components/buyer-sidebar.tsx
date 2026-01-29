import { Home, User2, ChevronUp, MessageSquare, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { auth } from "@/auth";
import LogoutButton from "./logout";
import Link from "next/link";

// Menu items.

const items = [
    {
        title: "Browse Vehicles",
        url: "/dashboard/buyer",
        icon: Home,
    },
    {
        title: "My Inquiries",
        url: "/dashboard/buyer/inquiries",
        icon: MessageSquare,
    },
    {
        title: "Profile",
        url: "/dashboard/buyer/profile",
        icon: User,
    },
];

export default async function BuyerSidebar() {

    const session = await auth();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                   <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="mt-2">
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full">
                                    <User2 className="mr-2" />
                                    <span>{session?.user.email}</span>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-full">
                                <DropdownMenuItem>
                                    <LogoutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}