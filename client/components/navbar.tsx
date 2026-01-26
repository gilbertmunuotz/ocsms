import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center px-4">
                {/* Left: Brand */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                ocsms<span className="text-primary">.</span>
                </Link>

                {/* Spacer */}
                <div className="ml-auto flex items-center gap-3">
                    <Button variant="ghost" asChild>
                        <Link href="/auth/login">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/auth/register">Register</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
