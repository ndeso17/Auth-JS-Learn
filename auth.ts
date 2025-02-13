import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import { Adapter } from "next-auth/adapters";
import { NextResponse } from "next/server";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

interface CustomUser {
  id: string;
  email: string;
  role: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter, 
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) return null;

        return user as CustomUser;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/dashboard", "/user", "/product"];
      const publicRoutes = ["/login", "/register"];

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && publicRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser & { gender?: string }; 
        token.role = customUser.role;
        token.gender = customUser.gender; 
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role as string;
      session.user.gender = token.gender as string; 
      return session;
    },
  },
});
