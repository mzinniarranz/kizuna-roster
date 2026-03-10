import { Character } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";

export async function getRoster(
  repository: CharacterRepository
): Promise<Character[]> {
  return repository.findAll();
}
