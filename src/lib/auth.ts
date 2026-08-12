import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

const providers: NextAuthOptions["providers"] = [];

const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

// Google OAuth — admin only when ENABLE_ADMIN_AUTH=true
if (
  process.env.ENABLE_ADMIN_AUTH === "true" &&
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"
) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: false,
    })
  );
}

// Dev credentials — NEVER in production
if (
  process.env.NODE_ENV === "development" &&
  process.env.ENABLE_DEV_LOGIN === "true"
) {
  providers.push(
    CredentialsProvider({
      name: "Dev Login",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = credentials.email.trim().toLowerCase();
        if (adminEmail && email !== adminEmail) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== "ADMIN") return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers,
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (user) {
          (session.user as Record<string, unknown>).id = user.id;
          (session.user as Record<string, unknown>).role = (
            user as unknown as Record<string, unknown>
          ).role;
        } else if (token) {
          (session.user as Record<string, unknown>).id = token.sub;
          (session.user as Record<string, unknown>).role = token.role;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as Record<string, unknown>).role;
      }
      // Re-check role from DB periodically via token — keep short sessions
      return token;
    },
    async signIn({ user }) {
      const email = (user.email || "").trim().toLowerCase();
      if (!adminEmail || !email || email !== adminEmail) {
        return false;
      }
      await prisma.user.updateMany({
        where: { email: adminEmail },
        data: { role: "ADMIN", banned: false },
      });
      return true;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/",
  },
  session: {
    strategy: providers.some((p) => p.id === "credentials") ? "jwt" : "database",
    // Short-lived admin sessions — re-auth often (use rotating VPN + CF Access)
    maxAge: 4 * 60 * 60,
    updateAge: 30 * 60,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  events: {
    async signIn() {
      // Intentionally no IP logging — fingerprints only elsewhere; admin uses rotating VPN
    },
  },
};
