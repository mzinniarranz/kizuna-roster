import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Character, Role, WowClass } from "@domain/character/Character";
import { addCharacterToRoster } from "@application/roster/addCharacterToRoster";
import { addCharacterManually } from "@application/roster/addCharacterManually";
import { addAlterToRoster } from "@application/roster/addAlterToRoster";
import { removeCharacterFromRoster } from "@application/roster/removeCharacterFromRoster";
import { updateCharacterRole } from "@application/roster/updateCharacterRole";
import { promoteAlterToMain } from "@application/roster/promoteAlterToMain";
import { classIdToWowClass } from "@domain/character/wowClassMap";

import { useGuildCharacters } from "./useGuildCharacters";

interface UseCharacterSelectorOptions {
  userId: string;
  userMain: Character | null;
  userAlters: Character[];
  rosterBlizzardIds: Set<string>;
}

export function useCharacterSelector({
  userId,
  userMain,
  userAlters,
  rosterBlizzardIds,
}: UseCharacterSelectorOptions) {
  const router = useRouter();
  const { data: guildCharacters, isLoading, error } = useGuildCharacters();

  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Guild selector state (for adding main)
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<Role>("DPS_MELEE");

  // Alter selector state
  const [selectedAlterId, setSelectedAlterId] = useState<number>(0);
  const [alterRole, setAlterRole] = useState<Role>("DPS_MELEE");

  // Manual form state
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualClass, setManualClass] = useState<WowClass>("WARRIOR");
  const [manualRole, setManualRole] = useState<Role>("DPS_MELEE");

  const userAlterBlizzardIds = new Set(userAlters.map((a) => a.blizzardId));

  const availableForMain = (guildCharacters ?? []).filter(
    (gc) => !userAlterBlizzardIds.has(String(gc.id))
  );

  const availableForAlter = (guildCharacters ?? []).filter(
    (gc) => !rosterBlizzardIds.has(String(gc.id))
  );

  const effectiveSelectedId =
    selectedId === 0 ? (availableForMain[0]?.id ?? 0) : selectedId;
  const selectedGuildCharacter =
    availableForMain.find((c) => c.id === effectiveSelectedId) ?? null;
  const selectedWowClass = selectedGuildCharacter
    ? classIdToWowClass(selectedGuildCharacter.classId)
    : null;

  const effectiveSelectedAlterId =
    selectedAlterId === 0 ? (availableForAlter[0]?.id ?? 0) : selectedAlterId;
  const selectedAlterCharacter =
    availableForAlter.find((c) => c.id === effectiveSelectedAlterId) ?? null;
  const selectedAlterWowClass = selectedAlterCharacter
    ? classIdToWowClass(selectedAlterCharacter.classId)
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
    if (!userMain) return;
    dispatch(() => removeCharacterFromRoster(userMain.id, userId));
  };

  const handleRoleChange = (role: Role) => {
    if (!userMain) return;
    dispatch(() => updateCharacterRole(userMain.id, userId, role));
  };

  const handleAddAlter = () => {
    if (!selectedAlterCharacter) return;
    setSubmitError(null);
    startTransition(async () => {
      const result = await addAlterToRoster({
        blizzardId: selectedAlterCharacter.id,
        name: selectedAlterCharacter.name,
        realmSlug: selectedAlterCharacter.realmSlug,
        classId: selectedAlterCharacter.classId,
        role: alterRole,
        addedById: userId,
      });
      if (result.success) {
        setSelectedAlterId(0);
        router.refresh();
      } else {
        setSubmitError(result.error ?? "Unknown error");
      }
    });
  };

  const handleAlterRoleChange = (alterId: string, role: Role) => {
    dispatch(() => updateCharacterRole(alterId, userId, role));
  };

  const handleRemoveAlter = (alterId: string) => {
    dispatch(() => removeCharacterFromRoster(alterId, userId));
  };

  const handlePromoteAlter = (alterId: string) => {
    dispatch(() => promoteAlterToMain(alterId, userId));
  };

  return {
    // Query state
    guildCharacters,
    isLoading,
    error,
    // Submission state
    isPending,
    submitError,
    // Guild selector (for main)
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
    // Main character actions
    handleRemove,
    handleRoleChange,
    // Alters
    availableForMain,
    availableForAlter,
    effectiveSelectedAlterId,
    setSelectedAlterId,
    selectedAlterWowClass,
    alterRole,
    setAlterRole,
    handleAddAlter,
    handleAlterRoleChange,
    handleRemoveAlter,
    handlePromoteAlter,
  };
}
