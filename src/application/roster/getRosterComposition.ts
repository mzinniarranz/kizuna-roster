import { Character, Role, WowClass } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";

export type RosterComposition = Map<WowClass, Map<Role, number>>;

export async function getRosterComposition(
  repository: CharacterRepository
): Promise<RosterComposition> {
  const characters = await repository.findAllMains();
  return buildComposition(characters);
}

function buildComposition(characters: Character[]): RosterComposition {
  const composition: RosterComposition = new Map();

  for (const character of characters) {
    if (!composition.has(character.wowClass)) {
      composition.set(character.wowClass, new Map());
    }

    const roleMap = composition.get(character.wowClass)!;
    roleMap.set(character.role, (roleMap.get(character.role) ?? 0) + 1);
  }

  return composition;
}
