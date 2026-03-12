import type { NextAuthConfig } from "next-auth";
import BattleNet from "next-auth/providers/battlenet";

export const authConfig: NextAuthConfig = {
  debug: false,
  pages: {
    error: "/auth/error",
  },
  providers: [
    BattleNet({
      clientId: process.env.BLIZZARD_CLIENT_ID!,
      clientSecret: process.env.BLIZZARD_CLIENT_SECRET!,
      issuer: "https://oauth.battle.net",
      checks: ["state", "nonce"],
      authorization: {
        params: { scope: "openid wow.profile" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = account.providerAccountId;
      }
      if (profile) {
        const battleTag = (profile as { battle_tag?: string }).battle_tag;
        token.battleTag = battleTag;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        battleTag: token.battleTag as string | undefined,
        userId: token.sub as string | undefined,
      };
    },
  },
};
