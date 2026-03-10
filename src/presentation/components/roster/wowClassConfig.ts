import { WowClass, Role } from "@domain/character/Character";

export const WOW_CLASS_COLOR: Record<WowClass, string> = {
  WARRIOR: "#C69B3A",
  PALADIN: "#F48CBA",
  HUNTER: "#AAD372",
  ROGUE: "#FFF468",
  PRIEST: "#FFFFFF",
  SHAMAN: "#0070DD",
  MAGE: "#3FC7EB",
  WARLOCK: "#8788EE",
  DRUID: "#FF7C0A",
  DEATH_KNIGHT: "#C41E3A",
  MONK: "#00FF98",
  DEMON_HUNTER: "#A330C9",
  EVOKER: "#33937F",
};

export const WOW_CLASS_LABEL: Record<WowClass, string> = {
  WARRIOR: "Warrior",
  PALADIN: "Paladin",
  HUNTER: "Hunter",
  ROGUE: "Rogue",
  PRIEST: "Priest",
  SHAMAN: "Shaman",
  MAGE: "Mage",
  WARLOCK: "Warlock",
  DRUID: "Druid",
  DEATH_KNIGHT: "Death Knight",
  MONK: "Monk",
  DEMON_HUNTER: "Demon Hunter",
  EVOKER: "Evoker",
};

export const ROLE_ORDER: Role[] = ["TANK", "HEALER", "DPS_MELEE", "DPS_CASTER"];

export const ROLE_LABEL: Record<Role, string> = {
  TANK: "Tank",
  HEALER: "Healer",
  DPS_MELEE: "DPS Melee",
  DPS_CASTER: "DPS Caster",
};

export const CLASS_ORDER: WowClass[] = [
  "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN",
  "MAGE", "WARLOCK", "DRUID", "DEATH_KNIGHT", "MONK", "DEMON_HUNTER", "EVOKER",
];
