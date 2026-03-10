import { useTranslations } from "next-intl";
import { Role, WowClass } from "@domain/character/Character";
import { RosterComposition } from "@application/roster/getRosterComposition";
import { ROLE_ORDER, ROLE_COLOR, WOW_CLASS_COLOR, WOW_CLASS_LABEL } from "./wowClassConfig";
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
      <div className="w-full max-w-2xl flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {t("title")}
        </h2>
        <RefreshButton />
      </div>

      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{ border: "1px solid #1a2438", background: "#0b0f1e" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "#0d1324", borderBottom: "1px solid #1a2438" }}>
                <th className="text-left py-3 px-4 text-white/30 font-medium text-xs w-36">
                  {t("columnClass")}
                </th>
                {ROLE_ORDER.map((role) => (
                  <th
                    key={role}
                    className="text-center py-3 px-4 font-semibold text-xs"
                    style={{ color: ROLE_COLOR[role] }}
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
              <tr style={{ borderTop: "1px solid #1a2438", background: "#0d1324" }}>
                <td className="py-3 px-4 text-white/30 text-xs font-medium">
                  {t("total")}
                </td>
                {ROLE_ORDER.map((role) => {
                  const total = totalByRole(role);
                  return (
                    <td key={role} className="text-center py-3 px-4">
                      {total > 0 ? (
                        <span
                          className="text-sm font-bold"
                          style={{ color: ROLE_COLOR[role] }}
                        >
                          {total}
                        </span>
                      ) : (
                        <span className="text-white/15 text-xs">—</span>
                      )}
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
    <tr
      className="transition-colors hover:bg-[#111827]"
      style={{ borderTop: "1px solid #131c2e" }}
    >
      <td className="py-2.5 px-4">
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
          <td key={role} className="text-center py-2.5 px-4">
            {count > 0 ? (
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold"
                style={{
                  background: `${classColor}22`,
                  color: classColor,
                  border: `1px solid ${classColor}44`,
                }}
              >
                {count}
              </span>
            ) : (
              <span className="text-white/15 text-xs">—</span>
            )}
          </td>
        );
      })}
    </tr>
  );
}
