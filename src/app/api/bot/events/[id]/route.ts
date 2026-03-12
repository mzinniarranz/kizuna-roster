import { NextRequest, NextResponse } from "next/server";

import { isBotAuthorized } from "@/app/api/bot/auth";
import { prisma } from "@infrastructure/db/prisma";

interface PatchBody {
  discordMsgId: string;
  channelId: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as PatchBody;

  const message = await prisma.botScheduledMessage.update({
    where: { id },
    data: { discordMsgId: body.discordMsgId, channelId: body.channelId },
  });

  return NextResponse.json(message);
}
