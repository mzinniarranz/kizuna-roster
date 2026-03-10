import { prisma } from "@infrastructure/db/prisma";

export async function getVerifiedBlizzardUserIds(): Promise<Set<string>> {
  const links = await prisma.discordLink.findMany({ select: { blizzardUserId: true } });
  return new Set(links.map((l) => l.blizzardUserId));
}
