import { NextRequest, NextResponse } from "next/server";

import { isBotAuthorized } from "@/app/api/bot/auth";
import { prisma } from "@infrastructure/db/prisma";

// Returns active scheduled messages that have a linked Discord poll message ID.
// Used by the bot on startup to rebuild its in-memory poll map.
export async function GET(request: NextRequest) {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const messages = await prisma.botScheduledMessage.findMany({
    where: {
      startDate: { lte: now },
      endDate: { gte: now },
      discordMsgId: { not: null },
    },
    select: { id: true, discordMsgId: true },
  });

  return NextResponse.json(
    messages.map((m) => ({ eventId: m.id, discordMsgId: m.discordMsgId }))
  );
}
