import { prisma } from "@infrastructure/db/prisma";

interface AttendancePayload {
  discordId: string;
  eventId: string;
  status: "YES" | "NO";
}

export async function saveAttendance(payload: AttendancePayload): Promise<void> {
  const { discordId, eventId, status } = payload;

  const link = await prisma.discordLink.findUnique({ where: { discordId } });
  if (!link) {
    console.warn(`[saveAttendance] No Discord link for discordId=${discordId}`);
    return;
  }

  const character = await prisma.character.findFirst({
    where: { addedById: link.blizzardUserId, isMain: true },
  });
  if (!character) {
    console.warn(`[saveAttendance] No main character for blizzardUserId=${link.blizzardUserId}`);
    return;
  }

  await prisma.attendance.upsert({
    where: { eventId_characterId: { eventId, characterId: character.id } },
    update: { status },
    create: { eventId, characterId: character.id, status },
  });
}
