import { Character } from "./Character";

export interface CharacterRepository {
  findAll(): Promise<Character[]>;
}
