import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * Configuração exclusiva do Auth.js v5 para o painel /admin.
 * Separada de lib/auth.ts para não conflitar com o sistema de auth
 * do app principal (gerenciado via Supabase Auth).
 *
 * SEGURANÇA:
 * - A autenticação do Admin utiliza bcrypt para comparação de senha.
 * - Defina ADMIN_PASSWORD_HASH no ambiente com o hash bcrypt da senha.
 * - Para gerar: node -e "const b=require('bcryptjs'); b.hash('SuaSenha',12).then(console.log)"
 */
export const { handlers, auth: adminAuth, signIn: adminSignIn, signOut: adminSignOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciais Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        // Lê o hash bcrypt da variável de ambiente ADMIN_PASSWORD_HASH
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (
          !credentials?.email ||
          !credentials?.password ||
          !adminEmail ||
          !adminPasswordHash
        ) {
          return null;
        }

        const isEmailValid = credentials.email === adminEmail;
        // Comparação segura usando bcrypt.compare() — resiste a timing attacks
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          adminPasswordHash
        );

        if (isEmailValid && isPasswordValid) {
          return {
            id: "admin-001",
            name: "Administrador",
            email: adminEmail,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
});
