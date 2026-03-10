import { Character } from "@domain/character/Character";
import { CharacterRepository } from "@domain/character/CharacterRepository";

const ROSTER: Character[] = [
  { id: "1", name: "Thrallium", wowClass: "WARRIOR", role: "TANK", addedById: "mock", isMain: true, blizzardId: "mock-1" },
  { id: "2", name: "Boulderstone", wowClass: "PALADIN", role: "TANK", addedById: "mock", isMain: true, blizzardId: "mock-2" },
  { id: "3", name: "Solacewind", wowClass: "PRIEST", role: "HEALER", addedById: "mock", isMain: true, blizzardId: "mock-3" },
  { id: "4", name: "Mistweave", wowClass: "MONK", role: "HEALER", addedById: "mock", isMain: true, blizzardId: "mock-4" },
  { id: "5", name: "Restoram", wowClass: "DRUID", role: "HEALER", addedById: "mock", isMain: true, blizzardId: "mock-5" },
  { id: "6", name: "Shockwave", wowClass: "SHAMAN", role: "HEALER", addedById: "mock", isMain: true, blizzardId: "mock-6" },
  { id: "7", name: "Shadowbane", wowClass: "ROGUE", role: "DPS_MELEE", addedById: "mock", isMain: true, blizzardId: "mock-7" },
  { id: "8", name: "Ironedge", wowClass: "WARRIOR", role: "DPS_MELEE", addedById: "mock", isMain: true, blizzardId: "mock-8" },
  { id: "9", name: "Runebreaker", wowClass: "DEATH_KNIGHT", role: "DPS_MELEE", addedById: "mock", isMain: true, blizzardId: "mock-9" },
  { id: "10", name: "Voidwalker", wowClass: "DEMON_HUNTER", role: "DPS_MELEE", addedById: "mock", isMain: true, blizzardId: "mock-10" },
  { id: "11", name: "Frostbolt", wowClass: "MAGE", role: "DPS_CASTER", addedById: "mock", isMain: true, blizzardId: "mock-11" },
  { id: "12", name: "Doomcaller", wowClass: "WARLOCK", role: "DPS_CASTER", addedById: "mock", isMain: true, blizzardId: "mock-12" },
  { id: "13", name: "Starweave", wowClass: "DRUID", role: "DPS_CASTER", addedById: "mock", isMain: true, blizzardId: "mock-13" },
  { id: "14", name: "Stormcall", wowClass: "SHAMAN", role: "DPS_CASTER", addedById: "mock", isMain: true, blizzardId: "mock-14" },
  { id: "15", name: "Emberwing", wowClass: "EVOKER", role: "DPS_CASTER", addedById: "mock", isMain: true, blizzardId: "mock-15" },
];

export const hardcodedCharacterRepository: CharacterRepository = {
  async findAll(): Promise<Character[]> {
    return ROSTER;
  },

  async findAllMains(): Promise<Character[]> {
    return ROSTER.filter((c) => c.isMain);
  },
};
