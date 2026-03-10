import { useTranslations } from "next-intl";
import { Character, Role } from "@domain/character/Character";
import { CharacterCard } from "./CharacterCard";

interface RoleColumnProps {
  role: Role;
  characters: Character[];
}

export function RoleColumn({ role, characters }: RoleColumnProps) {
  const t = useTranslations("RoleLabel");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-1">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {t(role)}
        </h2>
        <span className="text-xs text-white/40">{characters.length}</span>
      </div>
      <div className="flex flex-col gap-1">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
