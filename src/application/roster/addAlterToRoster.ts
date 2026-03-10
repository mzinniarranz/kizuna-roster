"use server";

import { Role } from "@domain/character/Character";
import { classIdToWowClass } from "@domain/character/wowClassMap";
import { prisma } from "@infrastructure/db/prisma";

interface AddAlterInput {
  blizzardId: number;
  name: string;
  realmSlug: string;
  classId: number;
  role: Role;
  addedById: string;
}

export async function addAlterToRoster(
  input: AddAlterInput
): Promise<{ success: boolean; error?: string }> {
  const wowClass = classIdToWowClass(input.classId);
  if (!wowClass) {
    return { success: false, error: "Unknown class" };
  }

  const existing = await prisma.character.findUnique({
    where: { blizzardId: String(input.blizzardId) },
  });

  if (existing) {
    return { success: false, error: "Character already in roster" };
  }

  await prisma.character.create({
    data: {
      name: input.name,
      realmSlug: input.realmSlug,
      wowClass,
      role: input.role,
      blizzardId: String(input.blizzardId),
      addedById: input.addedById,
      isMain: false,
    },
  });

  return { success: true };
}
