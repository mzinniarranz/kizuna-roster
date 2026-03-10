"use server";

import { prisma } from "@infrastructure/db/prisma";

export async function promoteAlterToMain(
  newMainId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const character = await prisma.character.findUnique({
    where: { id: newMainId },
  });

  if (!character) {
    return { success: false, error: "Character not found" };
  }

  if (character.addedById !== userId) {
    return { success: false, error: "Not authorized" };
  }

  await prisma.$transaction([
    prisma.character.updateMany({
      where: { addedById: userId },
      data: { isMain: false },
    }),
    prisma.character.update({
      where: { id: newMainId },
      data: { isMain: true },
    }),
  ]);

  return { success: true };
}
