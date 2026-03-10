import { prisma } from "@infrastructure/db/prisma";

interface LinkPayload {
  battleTag: string;
  discordId: string;
  discordUser: string;
}

interface LinkResult {
  success: boolean;
  battleTag?: string;
}

export async function linkDiscordAccount(payload: LinkPayload): Promise<LinkResult> {
  const { battleTag, discordId, discordUser } = payload;

  const profile = await prisma.userProfile.findFirst({
    where: { battleTag: { equals: battleTag, mode: "insensitive" } },
  });

  if (!profile) return { success: false };

  await prisma.discordLink.upsert({
    where: { discordId },
    update: { blizzardUserId: profile.blizzardId, discordUser },
    create: { discordId, discordUser, blizzardUserId: profile.blizzardId },
  });

  return { success: true, battleTag: profile.battleTag };
}
