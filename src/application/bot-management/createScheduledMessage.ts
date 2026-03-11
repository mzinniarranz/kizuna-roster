"use server";

import { auth } from "@/auth";
import { prisma } from "@infrastructure/db/prisma";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";
import { notifyBotReload } from "@application/bot-management/notifyBotReload";
import type { BotScheduledMessage } from "@domain/bot/BotScheduledMessage";

const THREE_MONTHS_MS = 3 * 30 * 24 * 60 * 60 * 1000;

interface CreateInput {
  text: string;
  dayOfWeek: number;
  hour: number;
  minute: number;
  startDate: string;
  endDate: string;
  channelId?: string;
}

export async function createScheduledMessage(
  input: CreateInput
): Promise<{ success: boolean; error?: string; message?: BotScheduledMessage }> {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  if (!sessionWithId?.userId) {
    return { success: false, error: "Unauthorized" };
  }

  const officer = await isGuildOfficer(sessionWithId.userId);
  if (!officer) {
    return { success: false, error: "Forbidden" };
  }

  if (!input.text.trim()) {
    return { success: false, error: "Message text is required" };
  }

  const start = new Date(input.startDate);
  const end = new Date(input.endDate);

  if (start >= end) {
    return { success: false, error: "End date must be after start date" };
  }

  if (end.getTime() - start.getTime() > THREE_MONTHS_MS) {
    return { success: false, error: "Maximum duration is 3 months" };
  }

  const message = await prisma.botScheduledMessage.create({
    data: {
      text: input.text.trim(),
      dayOfWeek: input.dayOfWeek,
      hour: input.hour,
      minute: input.minute,
      startDate: start,
      endDate: end,
      channelId: input.channelId ?? null,
      createdByBlizzardId: sessionWithId.userId,
    },
  });

  await notifyBotReload();

  return { success: true, message };
}
