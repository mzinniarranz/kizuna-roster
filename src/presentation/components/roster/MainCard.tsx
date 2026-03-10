"use client";

import { useTranslations } from "next-intl";

import { Character, Role } from "@domain/character/Character";

import { WOW_CLASS_COLOR, WOW_CLASS_LABEL, ROLE_ORDER, ROLE_LABEL } from "./wowClassConfig";

interface MainCardProps {
  character: Character;
  isPending: boolean;
  isVerified: boolean;
  onRemove: () => void;
  onRoleChange: (role: Role) => void;
}

export function MainCard({ character, isPending, isVerified, onRemove, onRoleChange }: MainCardProps) {
  const t = useTranslations("CharacterSelector");

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-yellow-400 flex-shrink-0 text-xs leading-none">★</span>
          <div
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: WOW_CLASS_COLOR[character.wowClass] }}
          />
          <span className="text-sm text-white truncate">{character.name}</span>
          {isVerified && (
            <span className="text-blue-400 text-xs leading-none flex-shrink-0">✓</span>
          )}
          <span
            className="text-xs ml-1 flex-shrink-0"
            style={{ color: WOW_CLASS_COLOR[character.wowClass] }}
          >
            {WOW_CLASS_LABEL[character.wowClass]}
          </span>
        </div>
        <div className="relative group/remove flex-shrink-0">
          <button
            onClick={onRemove}
            disabled={isPending}
            className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
            aria-label={t("changeCharacter")}
          >
            ✕
          </button>
          <div className="pointer-events-none absolute bottom-full right-0 mb-1.5 hidden group-hover/remove:block">
            <div className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg ring-1 ring-white/10">
              {t("changeCharacter")}
            </div>
          </div>
        </div>
      </div>

      <select
        value={character.role}
        onChange={(e) => onRoleChange(e.target.value as Role)}
        disabled={isPending}
        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30 disabled:opacity-50"
      >
        {ROLE_ORDER.map((role) => (
          <option key={role} value={role} className="bg-gray-900">
            {ROLE_LABEL[role]}
          </option>
        ))}
      </select>
    </>
  );
}
