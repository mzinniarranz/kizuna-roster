import { prisma } from "@infrastructure/db/prisma";
import { getGuildRosterWithRanks } from "@infrastructure/blizzard/blizzardProfileService";

const OFFICER_RANKS = new Set([1, 2]);

export async function isGuildOfficer(blizzardId: string): Promise<boolean> {
  const characters = await prisma.character.findMany({
    where: { addedById: blizzardId },
    select: { name: true, realmSlug: true },
  });

  if (characters.length === 0) return false;

  const rosterWithRanks = await getGuildRosterWithRanks();

  return characters.some((char) => {
    const key = `${char.name.toLowerCase()}|${char.realmSlug.toLowerCase()}`;
    const rank = rosterWithRanks.get(key);
    return rank !== undefined && OFFICER_RANKS.has(rank);
  });
}
