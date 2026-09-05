"use server";

import { adminSignIn } from "@/lib/auth-admin";
import { AuthError } from "next-auth";

export type AdminAuthState = {
  error?: string;
} | null;

export async function adminLoginAction(
  prevState: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  if (!email || !password) {
    return { error: "Preencha e-mail e senha." };
  }

  try {
    await adminSignIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas." };
        default:
          return { error: "Ocorreu um problema de autenticação." };
      }
    }
    // Repassamos o erro adiante porque o redirect() do Next.js
    // funciona internamente lançando um erro específico (NEXT_REDIRECT)
    throw error;
  }
  
  return null;
}

export async function logoutAdminAction(): Promise<void> {
  const { adminSignOut } = await import("@/lib/auth-admin");
  await adminSignOut({ redirectTo: "/auth/login" });
}
