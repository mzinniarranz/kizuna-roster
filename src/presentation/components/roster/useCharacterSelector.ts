import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Character, Role, WowClass } from "@domain/character/Character";
import { addCharacterToRoster } from "@application/roster/addCharacterToRoster";
import { addCharacterManually } from "@application/roster/addCharacterManually";
import { removeCharacterFromRoster } from "@application/roster/removeCharacterFromRoster";
import { updateCharacterRole } from "@application/roster/updateCharacterRole";
import { classIdToWowClass } from "@domain/character/wowClassMap";

import { useGuildCharacters } from "./useGuildCharacters";

interface UseCharacterSelectorOptions {
  userId: string;
  existingCharacter: Character | null;
}

export function useCharacterSelector({
  userId,
  existingCharacter,
}: UseCharacterSelectorOptions) {
  const router = useRouter();
  const { data: guildCharacters, isLoading, error } = useGuildCharacters();

  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Guild selector state
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<Role>("DPS_MELEE");

  // Manual form state
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualClass, setManualClass] = useState<WowClass>("WARRIOR");
  const [manualRole, setManualRole] = useState<Role>("DPS_MELEE");

  const effectiveSelectedId =
    selectedId === 0 ? (guildCharacters?.[0]?.id ?? 0) : selectedId;
  const selectedGuildCharacter =
    guildCharacters?.find((c) => c.id === effectiveSelectedId) ?? null;
  const selectedWowClass = selectedGuildCharacter
    ? classIdToWowClass(selectedGuildCharacter.classId)
    : null;

  const dispatch = (fn: () => Promise<{ success: boolean; error?: string }>) => {
    setSubmitError(null);
    startTransition(async () => {
      const result = await fn();
      if (result.success) {
        router.refresh();
      } else {
        setSubmitError(result.error ?? "Unknown error");
      }
    });
  };

  const handleAdd = () => {
    if (!selectedGuildCharacter) return;
    dispatch(() =>
      addCharacterToRoster({
        blizzardId: selectedGuildCharacter.id,
        name: selectedGuildCharacter.name,
        realmSlug: selectedGuildCharacter.realmSlug,
        classId: selectedGuildCharacter.classId,
        role: selectedRole,
        addedById: userId,
      })
    );
  };

  const handleManualAdd = () => {
    if (!manualName.trim()) return;
    dispatch(() =>
      addCharacterManually({
        name: manualName.trim(),
        wowClass: manualClass,
        role: manualRole,
        addedById: userId,
      })
    );
  };

  const handleRemove = () => {
    if (!existingCharacter) return;
    dispatch(() => removeCharacterFromRoster(existingCharacter.id, userId));
  };

  const handleRoleChange = (role: Role) => {
    if (!existingCharacter) return;
    dispatch(() => updateCharacterRole(existingCharacter.id, userId, role));
  };

  return {
    // Query state
    guildCharacters,
    isLoading,
    error,
    // Submission state
    isPending,
    submitError,
    // Guild selector
    effectiveSelectedId,
    setSelectedId,
    selectedRole,
    setSelectedRole,
    selectedGuildCharacter,
    selectedWowClass,
    handleAdd,
    // Manual form
    showManualForm,
    setShowManualForm,
    manualName,
    setManualName,
    manualClass,
    setManualClass,
    manualRole,
    setManualRole,
    handleManualAdd,
    // Existing character
    handleRemove,
    handleRoleChange,
  };
}
