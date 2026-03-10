"use client";

import { useTranslations } from "next-intl";

import { Character } from "@domain/character/Character";

import { useCharacterSelector } from "./useCharacterSelector";
import { MainCard } from "./MainCard";
import { AddMainForm } from "./AddMainForm";
import { AltersSection } from "./AltersSection";

interface CharacterSelectorProps {
  userId: string;
  userMain: Character | null;
  userAlters: Character[];
  rosterBlizzardIds: Set<string>;
}

export function CharacterSelector({
  userId,
  userMain,
  userAlters,
  rosterBlizzardIds,
}: CharacterSelectorProps) {
  const t = useTranslations("CharacterSelector");
  const {
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
    availableForMain,
    availableForAlter,
    effectiveSelectedAlterId,
    setSelectedAlterId,
    alterRole,
    setAlterRole,
    handleAddAlter,
    handleAlterRoleChange,
    handleRemoveAlter,
    handlePromoteAlter,
  } = useCharacterSelector({ userId, userMain, userAlters, rosterBlizzardIds });

  if (isLoading) {
    return <p className="text-xs text-white/40 animate-pulse">{t("loading")}</p>;
  }

  if (error) {
    return (
      <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
        <p className="font-semibold">{t("loadErrorTitle")}</p>
        <p className="mt-1 text-red-400/70">{error.message}</p>
      </div>
    );
  }

  const showAltersSection =
    userAlters.length > 0 || (userMain !== null && availableForAlter.length > 0);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
        {t("main")}
      </span>

      {userMain ? (
        <MainCard
          character={userMain}
          isPending={isPending}
          onRemove={handleRemove}
          onRoleChange={handleRoleChange}
        />
      ) : (
        <AddMainForm
          availableForMain={availableForMain}
          effectiveSelectedId={effectiveSelectedId}
          setSelectedId={setSelectedId}
          selectedGuildCharacter={selectedGuildCharacter}
          selectedWowClass={selectedWowClass}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          handleAdd={handleAdd}
          showManualForm={showManualForm}
          setShowManualForm={setShowManualForm}
          manualName={manualName}
          setManualName={setManualName}
          manualClass={manualClass}
          setManualClass={setManualClass}
          manualRole={manualRole}
          setManualRole={setManualRole}
          handleManualAdd={handleManualAdd}
          isPending={isPending}
        />
      )}

      {showAltersSection && (
        <AltersSection
          userAlters={userAlters}
          userMain={userMain}
          availableForAlter={availableForAlter}
          effectiveSelectedAlterId={effectiveSelectedAlterId}
          setSelectedAlterId={setSelectedAlterId}
          alterRole={alterRole}
          setAlterRole={setAlterRole}
          isPending={isPending}
          handleAddAlter={handleAddAlter}
          handleAlterRoleChange={handleAlterRoleChange}
          handleRemoveAlter={handleRemoveAlter}
          handlePromoteAlter={handlePromoteAlter}
        />
      )}

      {submitError && <p className="text-xs text-red-400">{submitError}</p>}
    </div>
  );
}
