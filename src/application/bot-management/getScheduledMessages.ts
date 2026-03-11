import { prisma } from "@infrastructure/db/prisma";

import type { BotScheduledMessage } from "@domain/bot/BotScheduledMessage";

export async function getScheduledMessages(): Promise<BotScheduledMessage[]> {
  return prisma.botScheduledMessage.findMany({
    orderBy: { createdAt: "asc" },
  });
}
