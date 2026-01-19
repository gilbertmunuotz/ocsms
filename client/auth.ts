import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE INPUT:", credentials);

        if (!credentials?.email) {
          return null;
        }

        // TEMP MOCK USERS (password ignored)
        const email = credentials.email;

        if (email === "admin@test.com") {
          return {
            id: "1",
            email,
            role: "admin",
            accessToken: "admin-token",
          };
        }

        if (email === "seller@test.com") {
          return {
            id: "2",
            email,
            role: "seller",
            accessToken: "seller-token",
          };
        }

        if (email === "buyer@test.com") {
          return {
            id: "3",
            email,
            role: "buyer",
            accessToken: "buyer-token",
          };
        }

        return null;
      }
,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};
