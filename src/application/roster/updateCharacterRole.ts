"use server";

import { Role } from "@domain/character/Character";
import { prisma } from "@infrastructure/db/prisma";

export async function updateCharacterRole(
  characterId: string,
  userId: string,
  role: Role
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

  await prisma.character.update({
    where: { id: characterId },
    data: { role },
  });

  return { success: true };
}
