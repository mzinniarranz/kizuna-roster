"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Role } from "@domain/character/Character";
import { BlizzardCharacter } from "@infrastructure/blizzard/blizzardProfileService";
import { addCharacterToRoster } from "@application/roster/addCharacterToRoster";
import { WOW_CLASS_COLOR, WOW_CLASS_LABEL, ROLE_ORDER } from "./wowClassConfig";
import { classIdToWowClass } from "@domain/character/wowClassMap";

const ROLE_LABEL: Record<Role, string> = {
  TANK: "Tank",
  HEALER: "Healer",
  DPS_MELEE: "DPS Melee",
  DPS_CASTER: "DPS Caster",
};

interface AddCharacterPanelProps {
  guildCharacters: BlizzardCharacter[];
}

export function AddCharacterPanel({ guildCharacters }: AddCharacterPanelProps) {
  const { data: rawSession } = useSession();
  const session = rawSession as typeof rawSession & { userId?: string };
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("DPS_MELEE");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const selected = guildCharacters.find((c) => c.id === selectedId) ?? null;

  const handleSubmit = () => {
    if (!selected || !session?.userId) return;
    setError(null);

    startTransition(async () => {
      const result = await addCharacterToRoster({
        blizzardId: selected.id,
        name: selected.name,
        realmSlug: selected.realmSlug,
        classId: selected.classId,
        role: selectedRole,
        addedById: session.userId!,
      });

      if (result.success) {
        router.refresh();
      } else {
        setError(result.error ?? "Unknown error");
      }
    });
  };

  if (guildCharacters.length === 0) {
    return (
      <p className="text-xs text-white/40 px-4 py-3">
        No Kizuna characters found on this account.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-3 border-t border-white/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Add your character
      </p>

      <div className="flex flex-col gap-1">
        {guildCharacters.map((character) => {
          const wowClass = classIdToWowClass(character.classId);
          const color = wowClass ? WOW_CLASS_COLOR[wowClass] : "#fff";
          const label = wowClass ? WOW_CLASS_LABEL[wowClass] : "Unknown";

          return (
            <button
              key={character.id}
              onClick={() => setSelectedId(character.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors cursor-pointer ${
                selectedId === character.id
                  ? "bg-white/15"
                  : "hover:bg-white/5"
              }`}
            >
              <div
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-white truncate">
                {character.name}
              </span>
              <span className="ml-auto text-xs flex-shrink-0" style={{ color }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-1">
            {ROLE_ORDER.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  selectedRole === role
                    ? "bg-white/20 text-white font-semibold"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                {ROLE_LABEL[role]}
              </button>
            ))}
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add to roster"}
          </button>
        </div>
      )}
    </div>
  );
}
