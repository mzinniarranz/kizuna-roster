"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Character, Role } from "@domain/character/Character";
import { ROLE_ORDER, WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";
import { CharacterSelector } from "./CharacterSelector";

interface RosterSidebarProps {
  characters: Character[];
  userId?: string;
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function RosterSidebar({ characters, userId }: RosterSidebarProps) {
  const t = useTranslations("RosterGrid");
  const tRole = useTranslations("RoleLabel");

  const [showAlters, setShowAlters] = useState(true);

  const mainCharacters = characters.filter((c) => c.isMain);

  const userMain = userId
    ? (characters.find((c) => c.addedById === userId && c.isMain) ?? null)
    : null;
  const userAlters = userId
    ? characters.filter((c) => c.addedById === userId && !c.isMain)
    : [];
  const rosterBlizzardIds = new Set(characters.map((c) => c.blizzardId));

  const byRole = (role: Role) =>
    mainCharacters.filter((character) => character.role === role);

  const hasAnyAlters = characters.some((c) => !c.isMain);

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
            {t("players", { count: mainCharacters.length })}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {userId && (
          <CharacterSelector
            userId={userId}
            userMain={userMain}
            userAlters={userAlters}
            rosterBlizzardIds={rosterBlizzardIds}
          />
        )}

        <div className="flex flex-col gap-4">
          {hasAnyAlters && (
            <div className="flex justify-end">
              <div className="relative group/alters-toggle">
                <button
                  onClick={() => setShowAlters((previous) => !previous)}
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    showAlters ? "text-white/50 hover:text-white/80" : "text-white/25 hover:text-white/50"
                  }`}
                  aria-label={showAlters ? t("hideAlters") : t("showAlters")}
                >
                  {showAlters ? <EyeIcon /> : <EyeOffIcon />}
                </button>
                <div className="pointer-events-none absolute bottom-full right-0 mb-1.5 hidden group-hover/alters-toggle:block z-10">
                  <div className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg ring-1 ring-white/10">
                    {showAlters ? t("hideAlters") : t("showAlters")}
                  </div>
                </div>
              </div>
            </div>
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
                {group.map((main) => {
                  const alters = characters.filter(
                    (c) => !c.isMain && c.addedById === main.addedById,
                  );
                  return (
                    <div key={main.id} className="flex flex-col">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 transition-colors">
                        <div
                          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: WOW_CLASS_COLOR[main.wowClass] }}
                        />
                        <span className="text-sm text-white truncate">{main.name}</span>
                        <span
                          className="ml-auto text-xs flex-shrink-0"
                          style={{ color: WOW_CLASS_COLOR[main.wowClass] }}
                        >
                          {WOW_CLASS_LABEL[main.wowClass]}
                        </span>
                      </div>
                      {showAlters && alters.length > 0 && (
                        <div className="ml-4 border-l border-white/10 flex flex-col">
                          {alters.map((alter) => (
                            <div
                              key={alter.id}
                              className="flex items-center gap-2 pl-3 pr-2 py-1 rounded-r hover:bg-white/5 transition-colors"
                            >
                              <div
                                className="h-1 w-1 rounded-full flex-shrink-0"
                                style={{ backgroundColor: WOW_CLASS_COLOR[alter.wowClass] }}
                              />
                              <span className="text-xs text-white/70 truncate">{alter.name}</span>
                              <span
                                className="ml-auto text-xs flex-shrink-0 opacity-60"
                                style={{ color: WOW_CLASS_COLOR[alter.wowClass] }}
                              >
                                {WOW_CLASS_LABEL[alter.wowClass]}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
