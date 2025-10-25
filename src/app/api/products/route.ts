import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://fakestoreapi.com/users")
        const users = await res.json()
        const user = users.find(
          (u: any) =>
            u.username === credentials?.username &&
            credentials?.password === "password"
        )
        if (user) return user
        return null
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "revoshop-secret",
})

export { handler as GET, handler as POST }
