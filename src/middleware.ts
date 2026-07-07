import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/auth-admin";
import { decrypt } from "@/lib/session";

// Rotas que requerem qualquer sessão autenticada (JWT manual)
const PRIVATE_ROUTES = ['/dashboard', '/cliente'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Protege painel /admin com NextAuth ────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const session = await adminAuth();
    if (!session || session.user?.role !== "admin") {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── Protege rotas privadas do app com JWT manual ──────────────────────
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  if (isPrivateRoute) {
    const sessionCookie = request.cookies.get("session")?.value;
    const payload = await decrypt(sessionCookie);

    if (!payload?.userId) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/cliente/:path*"],
};
