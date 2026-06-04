import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, Wrench, DollarSign, Settings, LogOut } from "lucide-react";
import { ReactNode } from "react";
import { adminAuth } from "@/lib/auth-admin";
import { logoutAdminAction } from "@/app/actions/auth-admin";
import { AdminMobileNav } from "./_components/AdminMobileNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Segunda camada de proteção: defesa em profundidade server-side.
  // O middleware já intercepta, mas esta verificação garante proteção
  // mesmo em edge cases de cache ou bypass de middleware.
  const session = await adminAuth();

  if (!session || session.user?.role !== "admin") {
    redirect("/auth/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Usuários", href: "/admin/usuarios", icon: Users },
    { name: "Serviços", href: "/admin/servicos", icon: Wrench },
    { name: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-slate-800">
      {/* Mobile navigation overlay */}
      <AdminMobileNav user={session.user} navItems={navItems} />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex-col justify-between hidden md:flex">
        <div className="p-6">
          <Link href="/admin">
            <h1 className="text-2xl font-bold text-blue-600">
              Click<span className="text-slate-800">Admin</span>
            </h1>
          </Link>

          {/* Info do usuário autenticado */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
            <p className="text-xs text-slate-500 font-medium">Conectado como</p>
            <p className="text-sm text-slate-800 font-semibold truncate">
              {session.user?.name ?? session.user?.email}
            </p>
            <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Administrador
            </span>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout via Server Action */}
        <div className="p-6 border-t">
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
