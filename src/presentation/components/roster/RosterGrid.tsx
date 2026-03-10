import { useTranslations } from "next-intl";
import { Character, Role } from "@domain/character/Character";
import { ROLE_ORDER } from "./wowClassConfig";
import { RoleColumn } from "./RoleColumn";

interface RosterGridProps {
  characters: Character[];
}

export function RosterGrid({ characters }: RosterGridProps) {
  const t = useTranslations("RosterGrid");

  const byRole = (role: Role) =>
    characters.filter((character) => character.role === role);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <span className="text-white/40 text-sm">
          {t("players", { count: characters.length })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {ROLE_ORDER.map((role) => (
          <RoleColumn key={role} role={role} characters={byRole(role)} />
        ))}
      </div>
    </div>
  );
}
