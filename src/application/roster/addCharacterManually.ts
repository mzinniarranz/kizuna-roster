"use server";

import { Role, WowClass } from "@domain/character/Character";
import { prisma } from "@infrastructure/db/prisma";

interface AddCharacterManuallyInput {
  name: string;
  wowClass: WowClass;
  role: Role;
  addedById: string;
}

export async function addCharacterManually(
  input: AddCharacterManuallyInput
): Promise<{ success: boolean; error?: string }> {
  await prisma.character.create({
    data: {
      name: input.name,
      realmSlug: "sanguino",
      wowClass: input.wowClass,
      role: input.role,
      blizzardId: `manual-${crypto.randomUUID()}`,
      addedById: input.addedById,
      isMain: true,
    },
  });

  return { success: true };
}
