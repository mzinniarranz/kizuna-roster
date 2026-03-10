"use client";

import { useTranslations } from "next-intl";

import { Role, WowClass } from "@domain/character/Character";
import { classIdToWowClass } from "@domain/character/wowClassMap";

import { GuildCharacter } from "./useGuildCharacters";
import { WOW_CLASS_COLOR, WOW_CLASS_LABEL, ROLE_ORDER, ROLE_LABEL, CLASS_ORDER } from "./wowClassConfig";

interface AddMainFormProps {
  availableForMain: GuildCharacter[];
  effectiveSelectedId: number;
  setSelectedId: (id: number) => void;
  selectedGuildCharacter: GuildCharacter | null;
  selectedWowClass: WowClass | null;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
  handleAdd: () => void;
  showManualForm: boolean;
  setShowManualForm: (show: boolean) => void;
  manualName: string;
  setManualName: (name: string) => void;
  manualClass: WowClass;
  setManualClass: (cls: WowClass) => void;
  manualRole: Role;
  setManualRole: (role: Role) => void;
  handleManualAdd: () => void;
  isPending: boolean;
}

export function AddMainForm({
  availableForMain,
  effectiveSelectedId,
  setSelectedId,
  selectedGuildCharacter,
  selectedWowClass,
  selectedRole,
  setSelectedRole,
  handleAdd,
  showManualForm,
  setShowManualForm,
  manualName,
  setManualName,
  manualClass,
  setManualClass,
  manualRole,
  setManualRole,
  handleManualAdd,
  isPending,
}: AddMainFormProps) {
  const t = useTranslations("CharacterSelector");

  return (
    <>
      {!showManualForm && availableForMain.length > 0 ? (
        <div className="relative group/manual self-start">
          <button
            onClick={() => setShowManualForm(true)}
            className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            {t("addManually")}
          </button>
          <div className="pointer-events-none absolute top-full left-0 mt-1.5 hidden group-hover/manual:block z-10">
            <div className="w-44 rounded bg-gray-800 px-2 py-1.5 text-xs text-white/70 shadow-lg ring-1 ring-white/10 leading-snug">
              {t("addManuallyTooltip")}
            </div>
          </div>
        </div>
      ) : null}

      {availableForMain.length > 0 && !showManualForm && (
        <>
          <select
            value={effectiveSelectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {availableForMain.map((character) => {
              const cls = classIdToWowClass(character.classId);
              return (
                <option key={character.id} value={character.id} className="bg-gray-900">
                  {character.name} — {cls ? WOW_CLASS_LABEL[cls] : "Unknown"}
                </option>
              );
            })}
          </select>

          {selectedGuildCharacter && (
            <div className="flex items-center gap-2 px-2 py-1">
              <div
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: selectedWowClass
                    ? WOW_CLASS_COLOR[selectedWowClass]
                    : "#ffffff",
                }}
              />
              <span
                className="text-xs"
                style={{
                  color: selectedWowClass ? WOW_CLASS_COLOR[selectedWowClass] : "#ffffff",
                }}
              >
                {selectedWowClass ? WOW_CLASS_LABEL[selectedWowClass] : "Unknown"}
              </span>
            </div>
          )}

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as Role)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {ROLE_ORDER.map((role) => (
              <option key={role} value={role} className="bg-gray-900">
                {ROLE_LABEL[role]}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            disabled={isPending}
            className="w-full py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? t("adding") : t("addToRoster")}
          </button>
        </>
      )}

      {showManualForm && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder={t("characterNamePlaceholder")}
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          />
          <select
            value={manualClass}
            onChange={(e) => setManualClass(e.target.value as WowClass)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {CLASS_ORDER.map((cls) => (
              <option key={cls} value={cls} className="bg-gray-900">
                {WOW_CLASS_LABEL[cls]}
              </option>
            ))}
          </select>
          <select
            value={manualRole}
            onChange={(e) => setManualRole(e.target.value as Role)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {ROLE_ORDER.map((role) => (
              <option key={role} value={role} className="bg-gray-900">
                {ROLE_LABEL[role]}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleManualAdd}
              disabled={isPending || !manualName.trim()}
              className="flex-1 py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? t("adding") : t("addToRoster")}
            </button>
            <button
              onClick={() => setShowManualForm(false)}
              disabled={isPending}
              className="px-3 py-1.5 text-xs rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors cursor-pointer disabled:opacity-50"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
