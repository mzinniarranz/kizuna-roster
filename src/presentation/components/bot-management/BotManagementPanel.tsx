"use client";

import { useTranslations } from "next-intl";

import { ScheduledMessageList } from "./ScheduledMessageList";
import { ScheduledMessageForm } from "./ScheduledMessageForm";
import { useBotManagement } from "./useBotManagement";
import type { ScheduledMessageData } from "./types";

interface BotManagementPanelProps {
  initialMessages: ScheduledMessageData[];
}

export function BotManagementPanel({ initialMessages }: BotManagementPanelProps) {
  const t = useTranslations("BotManagement");
  const {
    forms,
    formErrors,
    pendingIndices,
    deletingIds,
    addForm,
    removeForm,
    updateForm,
    saveForm,
    handleDelete,
  } = useBotManagement(initialMessages);

  return (
    <div
      className="min-h-screen bg-[#06090f] px-6 py-10"
      style={{
        background:
          "radial-gradient(ellipse 100% 45% at 50% -5%, #0d1e3f 0%, #06090f 60%)",
      }}
    >
      <div className="mx-auto max-w-2xl flex flex-col gap-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">{t("title")}</h1>
          <p className="text-white/40 text-sm mt-1">{t("subtitle")}</p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-white/70 text-xs uppercase tracking-widest">
            {t("activeMessages")}
          </h2>
          <ScheduledMessageList
            messages={initialMessages}
            deletingIds={deletingIds}
            onDelete={handleDelete}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-white/70 text-xs uppercase tracking-widest">
            {t("newMessages")}
          </h2>
          {forms.map((form, index) => (
            <ScheduledMessageForm
              key={index}
              form={form}
              index={index}
              error={formErrors[index]}
              isPending={pendingIndices.has(index)}
              canRemove={forms.length > 1}
              onChange={(field, value) => updateForm(index, field, value)}
              onSave={() => saveForm(index)}
              onRemove={() => removeForm(index)}
            />
          ))}

          <button
            onClick={addForm}
            className="self-start rounded-md border border-[#1a2438] hover:border-[#2a3a58] px-4 py-2 text-sm text-white/60 hover:text-white/90 transition-colors"
          >
            + {t("addAnother")}
          </button>
        </section>
      </div>
    </div>
  );
}
