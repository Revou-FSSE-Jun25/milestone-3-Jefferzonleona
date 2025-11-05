import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Dummy users (dev only)
        const USERS = [
          { id: "1", name: "Admin", email: "admin@revoshop", username: "admin", password: "12345", role: "admin" },
          { id: "2", name: "User", email: "user@revoshop", username: "user", password: "12345", role: "user" },
        ];

        const user = USERS.find((u) => (u.username === credentials.username || u.email === credentials.username) && u.password === credentials.password);

        if (user) {
          // return object must correspond to NextAuth's User type (id as string)
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }

        return null;
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      (session.user as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "revoshop-secret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
