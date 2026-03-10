import { Character } from "@domain/character/Character";
import { WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const classColor = WOW_CLASS_COLOR[character.wowClass];
  const classLabel = WOW_CLASS_LABEL[character.wowClass];

  return (
    <div className="flex items-center gap-3 rounded-md bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors">
      <div
        className="h-2 w-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: classColor }}
      />
      <span className="font-medium text-white text-sm">{character.name}</span>
      <span className="ml-auto text-xs" style={{ color: classColor }}>
        {classLabel}
      </span>
    </div>
  );
}
