import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Configuração exclusiva do Auth.js v5 para o painel /admin.
 * Separada de lib/auth.ts para não conflitar com o sistema de auth
 * do app principal (baseado em cookie JWT manual via lib/session.ts).
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
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          !credentials?.email ||
          !credentials?.password ||
          !adminEmail ||
          !adminPassword
        ) {
          return null;
        }

        const isEmailValid = credentials.email === adminEmail;
        const isPasswordValid = credentials.password === adminPassword;

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
