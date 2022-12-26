import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (params) => {
      const userExists = await prisma.user.findFirst({
        where: {
          email: params.user.email as string,
        },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            email: params.user.email as string,
            name: params.user.name as string,
          },
        });
      }

      return true;
    },
    session: async ({ session }) => {
      if (session.user) {
        const user = await prisma.user.findFirst({
          where: {
            email: session.user?.email as string,
          },
        });

        session.user.id = user?.id as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
