import { Character, WowClass, Role } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";
import { prisma } from "@infrastructure/db/prisma";

function mapRow(row: {
  id: string;
  name: string;
  wowClass: string;
  role: string;
  addedById: string;
  isMain: boolean;
  blizzardId: string;
}): Character {
  return {
    id: row.id,
    name: row.name,
    wowClass: row.wowClass as WowClass,
    role: row.role as Role,
    addedById: row.addedById,
    isMain: row.isMain,
    blizzardId: row.blizzardId,
  };
}

export const prismaCharacterRepository: CharacterRepository = {
  async findAll(): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      orderBy: { createdAt: "asc" },
    });
    return rows.map(mapRow);
  },

  async findAllMains(): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      where: { isMain: true },
      orderBy: { createdAt: "asc" },
    });
    return rows.map(mapRow);
  },
};
