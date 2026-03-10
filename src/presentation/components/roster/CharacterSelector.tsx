"use client";

import { Character, Role, WowClass } from "@domain/character/Character";

import { WOW_CLASS_COLOR, WOW_CLASS_LABEL, ROLE_ORDER } from "./wowClassConfig";
import { useCharacterSelector } from "./useCharacterSelector";
import { classIdToWowClass } from "@domain/character/wowClassMap";

const ROLE_LABEL: Record<Role, string> = {
  TANK: "Tank",
  HEALER: "Healer",
  DPS_MELEE: "DPS Melee",
  DPS_CASTER: "DPS Caster",
};

const CLASS_ORDER: WowClass[] = [
  "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN",
  "MAGE", "WARLOCK", "DRUID", "DEATH_KNIGHT", "MONK", "DEMON_HUNTER", "EVOKER",
];

interface CharacterSelectorProps {
  userId: string;
  existingCharacter: Character | null;
}

export function CharacterSelector({
  userId,
  existingCharacter,
}: CharacterSelectorProps) {
  const {
    guildCharacters,
    isLoading,
    error,
    isPending,
    submitError,
    effectiveSelectedId,
    setSelectedId,
    selectedRole,
    setSelectedRole,
    selectedGuildCharacter,
    selectedWowClass,
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
    handleRemove,
    handleRoleChange,
  } = useCharacterSelector({ userId, existingCharacter });

  if (isLoading) {
    return (
      <p className="text-xs text-white/40 animate-pulse">
        Loading characters...
      </p>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
        <p className="font-semibold">Could not load guild characters</p>
        <p className="mt-1 text-red-400/70">{error.message}</p>
      </div>
    );
  }

  if (existingCharacter) {
    const classColor = WOW_CLASS_COLOR[existingCharacter.wowClass];

    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Your character
        </span>
        <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: classColor }}
            />
            <span className="text-sm text-white truncate">
              {existingCharacter.name}
            </span>
          </div>
          <div className="relative group/remove flex-shrink-0">
            <button
              onClick={handleRemove}
              disabled={isPending}
              className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Change your character"
            >
              ✕
            </button>
            <div className="pointer-events-none absolute bottom-full right-0 mb-1.5 hidden group-hover/remove:block">
              <div className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg ring-1 ring-white/10">
                Change your character
              </div>
            </div>
          </div>
        </div>
        <select
          value={existingCharacter.role}
          onChange={(e) => handleRoleChange(e.target.value as Role)}
          disabled={isPending}
          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30 disabled:opacity-50"
        >
          {ROLE_ORDER.map((role) => (
            <option key={role} value={role} className="bg-gray-900">
              {ROLE_LABEL[role]}
            </option>
          ))}
        </select>
        {submitError && <p className="text-xs text-red-400">{submitError}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Your character
      </span>

      {!showManualForm ? (
        <div className="relative group/manual self-start">
          <button
            onClick={() => setShowManualForm(true)}
            className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            + Add manually
          </button>
          <div className="pointer-events-none absolute top-full left-0 mt-1.5 hidden group-hover/manual:block z-10">
            <div className="w-44 rounded bg-gray-800 px-2 py-1.5 text-xs text-white/70 shadow-lg ring-1 ring-white/10 leading-snug">
              If your character doesn't appear in the list, add it manually.
            </div>
          </div>
        </div>
      ) : null}

      {guildCharacters && guildCharacters.length > 0 && !showManualForm && (
        <>
          <select
            value={effectiveSelectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white cursor-pointer focus:outline-none focus:border-white/30"
          >
            {guildCharacters.map((character) => {
              const cls = classIdToWowClass(character.classId);
              return (
                <option
                  key={character.id}
                  value={character.id}
                  className="bg-gray-900"
                >
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
                  color: selectedWowClass
                    ? WOW_CLASS_COLOR[selectedWowClass]
                    : "#ffffff",
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
            {isPending ? "Adding..." : "Add to roster"}
          </button>

        </>
      )}

      {showManualForm && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Character name"
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
              {isPending ? "Adding..." : "Add to roster"}
            </button>
            <button
              onClick={() => setShowManualForm(false)}
              disabled={isPending}
              className="px-3 py-1.5 text-xs rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {submitError && <p className="text-xs text-red-400">{submitError}</p>}
    </div>
  );
}
