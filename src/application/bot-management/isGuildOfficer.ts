import { prisma } from "@infrastructure/db/prisma";
import { getGuildRosterWithRanks } from "@infrastructure/blizzard/blizzardProfileService";

const OFFICER_RANKS = new Set([0, 1]);

export async function isGuildOfficer(blizzardId: string): Promise<boolean> {
  const characters = await prisma.character.findMany({
    where: { addedById: blizzardId },
    select: { name: true, realmSlug: true },
  });

  if (characters.length === 0) {
    console.warn(`[isGuildOfficer] Sin personajes en DB para blizzardId=${blizzardId}`);
    return false;
  }

  const rosterWithRanks = await getGuildRosterWithRanks();

  const ranks = characters
    .map((char) => rosterWithRanks.get(`${char.name.toLowerCase()}|${char.realmSlug.toLowerCase()}`))
    .filter((r): r is number => r !== undefined);

  const highestRank = ranks.length > 0 ? Math.min(...ranks) : null;
  console.warn(`[isGuildOfficer] blizzardId=${blizzardId} → ranks=${JSON.stringify(ranks)} highestRank=${highestRank}`);

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.BYPASS_OFFICER_CHECK === "true"
  ) {
    return true;
  }

  return ranks.some((rank) => OFFICER_RANKS.has(rank));
}
