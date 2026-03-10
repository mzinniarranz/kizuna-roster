"use client";

import { useTranslations } from "next-intl";

import { Character, Role } from "@domain/character/Character";

import { WOW_CLASS_COLOR, WOW_CLASS_LABEL, ROLE_ORDER, ROLE_LABEL } from "./wowClassConfig";

interface AlterItemProps {
  alter: Character;
  isPending: boolean;
  onPromote: () => void;
  onRemove: () => void;
  onRoleChange: (role: Role) => void;
}

export function AlterItem({
  alter,
  isPending,
  onPromote,
  onRemove,
  onRoleChange,
}: AlterItemProps) {
  const t = useTranslations("CharacterSelector");
  const alterColor = WOW_CLASS_COLOR[alter.wowClass];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onPromote}
            disabled={isPending}
            title={t("promoteToMain")}
            className="text-white/30 hover:text-yellow-400 transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0 text-xs leading-none"
          >
            ☆
          </button>
          <div
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: alterColor }}
          />
          <span className="text-sm text-white truncate">{alter.name}</span>
          <span className="text-xs text-white/40 flex-shrink-0">{ROLE_LABEL[alter.role]}</span>
          <span className="text-xs flex-shrink-0" style={{ color: alterColor }}>
            · {WOW_CLASS_LABEL[alter.wowClass]}
          </span>
        </div>
        <button
          onClick={onRemove}
          disabled={isPending}
          className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
          aria-label="Remove alter"
        >
          ✕
        </button>
      </div>
      <select
        value={alter.role}
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
      <hr className="border-white/10 mt-1" />
    </div>
  );
}
