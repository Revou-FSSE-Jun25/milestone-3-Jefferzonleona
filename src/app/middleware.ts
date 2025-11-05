import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip static and api
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // public pages
  const publicPaths = ["/", "/auth/login", "/faq", "/about"];
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();

  // check cookies for next-auth token (quick guard)
  const token = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"],
};
