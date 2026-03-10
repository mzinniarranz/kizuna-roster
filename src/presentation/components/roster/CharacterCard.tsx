import { useTranslations } from "next-intl";

import { Character } from "@domain/character/Character";
import { WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";

interface CharacterCardProps {
  character: Character;
  isVerified: boolean;
}

export function CharacterCard({ character, isVerified }: CharacterCardProps) {
  const t = useTranslations("CharacterCard");
  const classColor = WOW_CLASS_COLOR[character.wowClass];
  const classLabel = WOW_CLASS_LABEL[character.wowClass];

  return (
    <div className="flex items-center gap-3 rounded-md bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors">
      <div
        className="h-2 w-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: classColor }}
      />
      <span className="font-medium text-white text-sm">{character.name}</span>
      {isVerified && (
        <div className="relative group/verified">
          <span className="text-blue-400 text-xs leading-none">✓</span>
          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/verified:block z-10">
            <div className="whitespace-nowrap rounded bg-[#0f1728] px-2 py-1 text-xs text-white shadow-lg ring-1 ring-white/10">
              {t("verifiedTooltip")}
            </div>
          </div>
        </div>
      )}
      <span className="ml-auto text-xs" style={{ color: classColor }}>
        {classLabel}
      </span>
    </div>
  );
}
