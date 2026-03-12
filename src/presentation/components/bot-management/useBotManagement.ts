import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createScheduledMessage } from "@application/bot-management/createScheduledMessage";
import { deleteScheduledMessage } from "@application/bot-management/deleteScheduledMessage";

import { type MessageFormState, type ScheduledMessageData, emptyForm } from "./types";

export function useBotManagement(initialMessages: ScheduledMessageData[]) {
  const router = useRouter();
  const [forms, setForms] = useState<MessageFormState[]>([emptyForm()]);
  const [formErrors, setFormErrors] = useState<Record<number, string>>({});
  const [pendingIndices, setPendingIndices] = useState<Set<number>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();

  const addForm = () => {
    setForms((previous) => [...previous, emptyForm()]);
  };

  const removeForm = (index: number) => {
    setForms((previous) => previous.filter((_, i) => i !== index));
    setFormErrors((previous) => {
      const next = { ...previous };
      delete next[index];
      return next;
    });
  };

  const updateForm = (
    index: number,
    field: keyof MessageFormState,
    value: string | number
  ) => {
    setForms((previous) =>
      previous.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      )
    );
  };

  const saveForm = (index: number) => {
    const form = forms[index];
    if (!form) return;

    const [hourString, minuteString] = form.time.split(":");
    const hour = Number(hourString);
    const minute = Number(minuteString);

    setPendingIndices((previous) => new Set(previous).add(index));
    setFormErrors((previous) => {
      const next = { ...previous };
      delete next[index];
      return next;
    });

    startTransition(async () => {
      const result = await createScheduledMessage({
        text: form.text,
        date: form.date,
        dayOfWeek: form.dayOfWeek,
        hour,
        minute,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      setPendingIndices((previous) => {
        const next = new Set(previous);
        next.delete(index);
        return next;
      });

      if (result.success) {
        removeForm(index);
        router.refresh();
      } else {
        setFormErrors((previous) => ({
          ...previous,
          [index]: result.error ?? "Unknown error",
        }));
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeletingIds((previous) => new Set(previous).add(id));

    startTransition(async () => {
      await deleteScheduledMessage(id);
      setDeletingIds((previous) => {
        const next = new Set(previous);
        next.delete(id);
        return next;
      });
      router.refresh();
    });
  };

  return {
    forms,
    formErrors,
    pendingIndices,
    deletingIds,
    addForm,
    removeForm,
    updateForm,
    saveForm,
    handleDelete,
    initialMessages,
  };
}
