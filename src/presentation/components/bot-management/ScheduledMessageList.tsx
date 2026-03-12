import { useTranslations } from "next-intl";

import type { ScheduledMessageData } from "./types";

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

interface ScheduledMessageListProps {
  messages: ScheduledMessageData[];
  deletingIds: Set<string>;
  onDelete: (id: string) => void;
}

export function ScheduledMessageList({
  messages,
  deletingIds,
  onDelete,
}: ScheduledMessageListProps) {
  const t = useTranslations("BotManagement");

  if (messages.length === 0) {
    return (
      <p className="text-white/40 text-sm py-4">{t("noMessages")}</p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => {
        const eventDate = new Date(message.date).toLocaleDateString();
        const time = `${String(message.hour).padStart(2, "0")}:${String(message.minute).padStart(2, "0")}`;
        const startDate = new Date(message.startDate).toLocaleDateString();
        const endDate = new Date(message.endDate).toLocaleDateString();
        const dayKey = DAY_KEYS[message.dayOfWeek];
        const isDeleting = deletingIds.has(message.id);

        return (
          <li
            key={message.id}
            className="flex items-start gap-4 rounded-lg border border-[#1a2438] bg-[#090d1a] px-4 py-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm leading-relaxed line-clamp-2">
                {message.text}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {eventDate} · {t(`days.${dayKey}`)} · {time} UTC · {startDate} → {endDate}
              </p>
            </div>
            <button
              onClick={() => onDelete(message.id)}
              disabled={isDeleting}
              className="shrink-0 text-white/40 hover:text-red-400 disabled:opacity-40 transition-colors text-xs mt-0.5"
            >
              {isDeleting ? t("deleting") : t("delete")}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
