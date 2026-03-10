import { Character, WowClass, Role } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";
import { prisma } from "@infrastructure/db/prisma";

export const prismaCharacterRepository: CharacterRepository = {
  async findAll(): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      orderBy: { createdAt: "asc" },
    });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      wowClass: row.wowClass as WowClass,
      role: row.role as Role,
      addedById: row.addedById,
    }));
  },
};
