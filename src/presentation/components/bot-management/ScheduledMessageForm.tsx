import { useTranslations } from "next-intl";

import type { MessageFormState } from "./types";

const DAYS = [1, 2, 3, 4, 5, 6, 0] as const; // Monday → Sunday

const MAX_DURATION_MS = 3 * 30 * 24 * 60 * 60 * 1000;

interface ScheduledMessageFormProps {
  form: MessageFormState;
  index: number;
  error: string | undefined;
  isPending: boolean;
  canRemove: boolean;
  onChange: (field: keyof MessageFormState, value: string | number) => void;
  onSave: () => void;
  onRemove: () => void;
}

export function ScheduledMessageForm({
  form,
  index,
  error,
  isPending,
  canRemove,
  onChange,
  onSave,
  onRemove,
}: ScheduledMessageFormProps) {
  const t = useTranslations("BotManagement");

  const maxEndDate = form.startDate
    ? new Date(new Date(form.startDate).getTime() + MAX_DURATION_MS)
        .toISOString()
        .slice(0, 10)
    : undefined;

  return (
    <div className="rounded-lg border border-[#1a2438] bg-[#090d1a] p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-xs uppercase tracking-widest">
          {t("messageLabel", { number: index + 1 })}
        </span>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <textarea
        value={form.text}
        onChange={(e) => onChange("text", e.target.value)}
        placeholder={t("textPlaceholder")}
        rows={3}
        className="w-full rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#2a3a58]"
      />

      <div className="flex flex-col gap-1">
        <label className="text-white/50 text-xs">{t("eventDate")}</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => onChange("date", e.target.value)}
          className="rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2a3a58]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-white/50 text-xs">{t("dayOfWeek")}</label>
          <select
            value={form.dayOfWeek}
            onChange={(e) => onChange("dayOfWeek", Number(e.target.value))}
            className="rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2a3a58]"
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {t(`days.${["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][day]}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/50 text-xs">{t("time")}</label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => onChange("time", e.target.value)}
            className="rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2a3a58]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/50 text-xs">{t("startDate")}</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className="rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2a3a58]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/50 text-xs">{t("endDate")}</label>
          <input
            type="date"
            value={form.endDate}
            min={form.startDate}
            max={maxEndDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className="rounded-md border border-[#1a2438] bg-[#06090f] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2a3a58]"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}

      <button
        onClick={onSave}
        disabled={isPending || !form.text.trim()}
        className="self-end rounded-md bg-[#1a3a6a] hover:bg-[#1e4480] disabled:opacity-40 px-4 py-2 text-sm text-white transition-colors"
      >
        {isPending ? t("saving") : t("save")}
      </button>
    </div>
  );
}
