import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Public routes: login & register
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    // Redirect logged-in users away from login/register
    if (token?.role) {
      switch (token.role) {
        case "ADMIN":
          return NextResponse.redirect(new URL("/dashboard/admin", req.url));
        case "SELLER":
          return NextResponse.redirect(new URL("/dashboard/seller", req.url));
        default:
          return NextResponse.redirect(new URL("/dashboard/buyer", req.url));
      }
    }
    return NextResponse.next();
  }

  // Require authentication for dashboard subfolders
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }


    // Role-based folder access
    if (pathname.startsWith("/dashboard/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/buyer", req.url));
    }

    if (pathname.startsWith("/dashboard/seller") && token.role !== "SELLER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/buyer", req.url));
    }

    if (pathname.startsWith("/dashboard/buyer") && token.role !== "BUYER" && token.role !== "SELLER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  // All other routes (public pages)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register"
  ]
};