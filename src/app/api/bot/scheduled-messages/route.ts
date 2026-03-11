import { NextRequest, NextResponse } from "next/server";

import { isBotAuthorized } from "@/app/api/bot/auth";
import { getScheduledMessages } from "@application/bot-management/getScheduledMessages";

export async function GET(request: NextRequest) {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await getScheduledMessages();
  return NextResponse.json(messages);
}
