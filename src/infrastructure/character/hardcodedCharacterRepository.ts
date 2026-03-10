import { Character } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";

const ROSTER: Character[] = [
  { id: "1", name: "Thrallium", wowClass: "WARRIOR", role: "TANK", addedById: "mock" },
  { id: "2", name: "Boulderstone", wowClass: "PALADIN", role: "TANK", addedById: "mock" },
  { id: "3", name: "Solacewind", wowClass: "PRIEST", role: "HEALER", addedById: "mock" },
  { id: "4", name: "Mistweave", wowClass: "MONK", role: "HEALER", addedById: "mock" },
  { id: "5", name: "Restoram", wowClass: "DRUID", role: "HEALER", addedById: "mock" },
  { id: "6", name: "Shockwave", wowClass: "SHAMAN", role: "HEALER", addedById: "mock" },
  { id: "7", name: "Shadowbane", wowClass: "ROGUE", role: "DPS_MELEE", addedById: "mock" },
  { id: "8", name: "Ironedge", wowClass: "WARRIOR", role: "DPS_MELEE", addedById: "mock" },
  { id: "9", name: "Runebreaker", wowClass: "DEATH_KNIGHT", role: "DPS_MELEE", addedById: "mock" },
  { id: "10", name: "Voidwalker", wowClass: "DEMON_HUNTER", role: "DPS_MELEE", addedById: "mock" },
  { id: "11", name: "Frostbolt", wowClass: "MAGE", role: "DPS_CASTER", addedById: "mock" },
  { id: "12", name: "Doomcaller", wowClass: "WARLOCK", role: "DPS_CASTER", addedById: "mock" },
  { id: "13", name: "Starweave", wowClass: "DRUID", role: "DPS_CASTER", addedById: "mock" },
  { id: "14", name: "Stormcall", wowClass: "SHAMAN", role: "DPS_CASTER", addedById: "mock" },
  { id: "15", name: "Emberwing", wowClass: "EVOKER", role: "DPS_CASTER", addedById: "mock" },
];

export const hardcodedCharacterRepository: CharacterRepository = {
  async findAll(): Promise<Character[]> {
    return ROSTER;
  },
};
