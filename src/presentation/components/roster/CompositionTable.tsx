import { useTranslations } from "next-intl";
import { Role, WowClass } from "@domain/character/Character";
import { RosterComposition } from "@application/roster/getRosterComposition";
import { ROLE_ORDER, WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";
import { RefreshButton } from "./RefreshButton";

interface CompositionTableProps {
  composition: RosterComposition;
}

export function CompositionTable({ composition }: CompositionTableProps) {
  const t = useTranslations("CompositionTable");
  const tRole = useTranslations("RoleLabel");

  const presentClasses = Array.from(composition.keys()).sort((a, b) =>
    WOW_CLASS_LABEL[a].localeCompare(WOW_CLASS_LABEL[b])
  );

  const totalByRole = (role: Role): number =>
    Array.from(composition.values()).reduce(
      (sum, roleMap) => sum + (roleMap.get(role) ?? 0),
      0
    );

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {t("title")}
        </h2>
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="absolute top-2 left-full pl-3">
          <RefreshButton />
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 text-white/40 font-medium text-xs w-36">
                {t("columnClass")}
              </th>
              {ROLE_ORDER.map((role) => (
                <th
                  key={role}
                  className="text-center py-2 px-4 text-white/40 font-medium text-xs"
                >
                  {tRole(role)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {presentClasses.map((wowClass) => (
              <ClassRow
                key={wowClass}
                wowClass={wowClass}
                roleMap={composition.get(wowClass)!}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/10">
              <td className="py-2 pr-4 text-white/40 text-xs font-medium">
                {t("total")}
              </td>
              {ROLE_ORDER.map((role) => {
                const total = totalByRole(role);
                return (
                  <td
                    key={role}
                    className="text-center py-2 px-4 text-white/60 font-semibold text-xs"
                  >
                    {total > 0 ? total : "—"}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}

interface ClassRowProps {
  wowClass: WowClass;
  roleMap: Map<Role, number>;
}

function ClassRow({ wowClass, roleMap }: ClassRowProps) {
  const classColor = WOW_CLASS_COLOR[wowClass];
  const classLabel = WOW_CLASS_LABEL[wowClass];

  return (
    <tr className="border-t border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-2 pr-4">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: classColor }}
          />
          <span className="text-xs font-medium" style={{ color: classColor }}>
            {classLabel}
          </span>
        </div>
      </td>
      {ROLE_ORDER.map((role) => {
        const count = roleMap.get(role) ?? 0;
        return (
          <td key={role} className="text-center py-2 px-4">
            {count > 0 ? (
              <span className="text-white font-semibold text-sm">{count}</span>
            ) : (
              <span className="text-white/20 text-xs">—</span>
            )}
          </td>
        );
      })}
    </tr>
  );
}
