import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/auth-admin";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

// Rotas que requerem qualquer sessão autenticada (Supabase Auth)
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

  // ── Atualiza/renova sessão Supabase Auth ───────────────────────────────
  const { supabaseResponse, user } = await updateSupabaseSession(request);

  // ── Protege rotas privadas do app com Supabase Auth ───────────────────
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  if (isPrivateRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/cliente/:path*"],
};

