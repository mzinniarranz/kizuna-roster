"use server";

import { auth } from "@/auth";
import { prisma } from "@infrastructure/db/prisma";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";
import { notifyBotReload } from "@application/bot-management/notifyBotReload";

export async function deleteScheduledMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  if (!sessionWithId?.userId) {
    return { success: false, error: "Unauthorized" };
  }

  let officer: boolean;
  try {
    officer = await isGuildOfficer(sessionWithId.userId);
  } catch {
    return { success: false, error: "Could not verify officer rank. Blizzard API unavailable, try again later." };
  }
  if (!officer) {
    return { success: false, error: "Forbidden" };
  }

  try {
    await prisma.botScheduledMessage.delete({ where: { id } });
  } catch {
    return { success: false, error: "Message not found" };
  }

  await notifyBotReload();

  return { success: true };
}
