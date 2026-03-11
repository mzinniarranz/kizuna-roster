"use client";

import { useTranslations } from "next-intl";

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

export function MonthCalendar() {
  const t = useTranslations("Calendar");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayJs = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = (firstDayJs + 6) % 7; // Convert to Monday-first

  const cells: (number | null)[] = [
    ...Array.from<null>({ length: offset }).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-white text-lg font-semibold tracking-wide">
        {t(`months.${MONTH_KEYS[month]}`)} {year}
      </h2>

      <div className="grid grid-cols-7 gap-px">
        {DAY_KEYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold uppercase tracking-widest text-white/30"
          >
            {t(`days.${day}`)}
          </div>
        ))}

        {cells.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-20 p-2 flex flex-col border-t
              ${day === null
                ? "border-transparent"
                : day === today
                  ? "border-[#2a5a9a] bg-[#0d1e3f]"
                  : "border-[#1a2438] bg-[#090d1a] hover:bg-[#0d1525] transition-colors"
              }
            `}
          >
            {day !== null && (
              <span
                className={`text-sm font-semibold ${
                  day === today ? "text-white" : "text-white/50"
                }`}
              >
                {day}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
