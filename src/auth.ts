import NextAuth from "next-auth";

import { prisma } from "@infrastructure/db/prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, account, profile }) {
      const updatedToken = await authConfig.callbacks!.jwt!({
        token,
        account,
        profile,
        user: undefined as never,
        trigger: undefined as never,
        session: undefined as never,
        isNewUser: undefined as never,
      });

      if (account && profile) {
        const battleTag = (profile as { battle_tag?: string }).battle_tag;
        try {
          if (battleTag) {
            await prisma.userProfile.upsert({
              where: { blizzardId: account.providerAccountId },
              update: { battleTag },
              create: { blizzardId: account.providerAccountId, battleTag },
            });
          } else {
            console.warn(
              "[auth] battle_tag no encontrado en profile:",
              JSON.stringify(profile),
            );
          }
        } catch (error) {
          console.error("[auth] Error guardando UserProfile:", error);
        }
      }

      return updatedToken;
    },
  },
});
