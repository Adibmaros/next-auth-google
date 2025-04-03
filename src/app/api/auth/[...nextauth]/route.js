import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const SignToken = (email) => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }
  return jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: "7d" });
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Tambahkan secret untuk menghindari error
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/new-user",
  },

  callbacks: {
    async signIn({ user }) {
      return true;
    },

    async jwt({ token, user, account }) {
      if (account) {
        try {
          token.userToken = SignToken(user?.email);
        } catch (error) {
          console.error("Error generating token:", error.message);
        }

        if (user) {
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.loggedUser = token.userToken || null;
      session.user = {
        ...session.user,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        if (url.includes("/api/auth/signin") || url.includes("/api/auth/callback")) {
          return `${baseUrl}/auth/dashboard`;
        }
        return url;
      } else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});

export { handler as GET, handler as POST };
