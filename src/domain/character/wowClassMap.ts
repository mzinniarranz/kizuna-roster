import { WowClass } from "./Character";

export const BLIZZARD_CLASS_ID_MAP: Record<number, WowClass> = {
  1: "WARRIOR",
  2: "PALADIN",
  3: "HUNTER",
  4: "ROGUE",
  5: "PRIEST",
  6: "DEATH_KNIGHT",
  7: "SHAMAN",
  8: "MAGE",
  9: "WARLOCK",
  10: "MONK",
  11: "DRUID",
  12: "DEMON_HUNTER",
  13: "EVOKER",
};

export function classIdToWowClass(classId: number): WowClass | null {
  return BLIZZARD_CLASS_ID_MAP[classId] ?? null;
}
