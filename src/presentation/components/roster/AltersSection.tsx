"use client";

import { useTranslations } from "next-intl";

import { Character, Role } from "@domain/character/Character";
import { classIdToWowClass } from "@domain/character/wowClassMap";

import { GuildCharacter } from "./useGuildCharacters";
import { WOW_CLASS_LABEL, ROLE_ORDER, ROLE_LABEL } from "./wowClassConfig";
import { AlterItem } from "./AlterItem";

interface AltersSectionProps {
  userAlters: Character[];
  userMain: Character | null;
  availableForAlter: GuildCharacter[];
  effectiveSelectedAlterId: number;
  setSelectedAlterId: (id: number) => void;
  alterRole: Role;
  setAlterRole: (role: Role) => void;
  isPending: boolean;
  handleAddAlter: () => void;
  handleAlterRoleChange: (id: string, role: Role) => void;
  handleRemoveAlter: (id: string) => void;
  handlePromoteAlter: (id: string) => void;
}

export function AltersSection({
  userAlters,
  userMain,
  availableForAlter,
  effectiveSelectedAlterId,
  setSelectedAlterId,
  alterRole,
  setAlterRole,
  isPending,
  handleAddAlter,
  handleAlterRoleChange,
  handleRemoveAlter,
  handlePromoteAlter,
}: AltersSectionProps) {
  const t = useTranslations("CharacterSelector");

  return (
    <>
      <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-1">
        {t("alters")}
      </span>

      {userAlters.map((alter) => (
        <AlterItem
          key={alter.id}
          alter={alter}
          isPending={isPending}
          onPromote={() => handlePromoteAlter(alter.id)}
          onRemove={() => handleRemoveAlter(alter.id)}
          onRoleChange={(role) => handleAlterRoleChange(alter.id, role)}
        />
      ))}

      {userMain !== null && availableForAlter.length > 0 && (
        <>
          <select
            value={effectiveSelectedAlterId}
            onChange={(e) => setSelectedAlterId(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {availableForAlter.map((character) => {
              const cls = classIdToWowClass(character.classId);
              return (
                <option key={character.id} value={character.id} className="bg-gray-900">
                  {character.name} — {cls ? WOW_CLASS_LABEL[cls] : "Unknown"}
                </option>
              );
            })}
          </select>

          <select
            value={alterRole}
            onChange={(e) => setAlterRole(e.target.value as Role)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {ROLE_ORDER.map((role) => (
              <option key={role} value={role} className="bg-gray-900">
                {ROLE_LABEL[role]}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddAlter}
            disabled={isPending}
            className="w-full py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? t("adding") : t("addAlter")}
          </button>
        </>
      )}
    </>
  );
}
