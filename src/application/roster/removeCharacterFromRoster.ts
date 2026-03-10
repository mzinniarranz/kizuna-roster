"use server";

import { prisma } from "@infrastructure/db/prisma";

export async function removeCharacterFromRoster(
  characterId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  if (!character) {
    return { success: false, error: "Character not found" };
  }

  if (character.addedById !== userId) {
    return { success: false, error: "Not authorized" };
  }

  await prisma.character.delete({ where: { id: characterId } });

  return { success: true };
}
