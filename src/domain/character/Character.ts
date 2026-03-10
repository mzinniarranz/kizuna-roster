export type Role = "TANK" | "HEALER" | "DPS_MELEE" | "DPS_CASTER";

export type WowClass =
  | "WARRIOR"
  | "PALADIN"
  | "HUNTER"
  | "ROGUE"
  | "PRIEST"
  | "SHAMAN"
  | "MAGE"
  | "WARLOCK"
  | "DRUID"
  | "DEATH_KNIGHT"
  | "MONK"
  | "DEMON_HUNTER"
  | "EVOKER";

export interface Character {
  id: string;
  name: string;
  wowClass: WowClass;
  role: Role;
  addedById: string;
}
