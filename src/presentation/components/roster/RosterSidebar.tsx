import Image from "next/image";
import { useTranslations } from "next-intl";

import { Character, Role } from "@domain/character/Character";
import { ROLE_ORDER, WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";
import { CharacterSelector } from "./CharacterSelector";

interface RosterSidebarProps {
  characters: Character[];
  userId?: string;
}

export function RosterSidebar({ characters, userId }: RosterSidebarProps) {
  const t = useTranslations("RosterGrid");
  const tRole = useTranslations("RoleLabel");

  const byRole = (role: Role) =>
    characters.filter((character) => character.role === role);

  const userCharacter = userId
    ? (characters.find((c) => c.addedById === userId) ?? null)
    : null;

  return (
    <aside className="flex flex-col h-full">
      <div className="flex flex-col items-center gap-2 px-4 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
        <Image
          src="/logo.jpg"
          alt="Kizuna"
          width={64}
          height={64}
          className="rounded-full"
          priority
        />
        <div className="flex items-baseline gap-2">
          <h1 className="text-base font-bold text-white">{t("title")}</h1>
          <span className="text-white/40 text-xs">
            {t("players", { count: characters.length })}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {userId && (
          <CharacterSelector
            userId={userId}
            existingCharacter={userCharacter}
          />
        )}

        {ROLE_ORDER.map((role) => {
          const group = byRole(role);
          if (group.length === 0) return null;
          return (
            <div key={role} className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {tRole(role)}
                </span>
                <span className="text-xs text-white/30">{group.length}</span>
              </div>
              {group.map((character) => (
                <div
                  key={character.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 transition-colors"
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: WOW_CLASS_COLOR[character.wowClass],
                    }}
                  />
                  <span className="text-sm text-white truncate">
                    {character.name}
                  </span>
                  <span
                    className="ml-auto text-xs flex-shrink-0"
                    style={{ color: WOW_CLASS_COLOR[character.wowClass] }}
                  >
                    {WOW_CLASS_LABEL[character.wowClass]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
