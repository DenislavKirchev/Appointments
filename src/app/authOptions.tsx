import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET || "",
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });
        const user = await res.json();
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...(token as any), ...user };
    },
    async session({ session, token }: any) {
      session.user = token as any;
      session.user.id = parseInt(session.user.id);
      return session;
    }
  }
});