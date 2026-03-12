import { NextRequest, NextResponse } from "next/server";

import { saveAttendance } from "@application/discord/saveAttendance";
import { isBotAuthorized } from "../auth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    discordId: string;
    scheduledMessageId: string;
    status: "YES" | "NO";
  };

  if (!body.discordId || !body.scheduledMessageId || !body.status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await saveAttendance(body);
  return NextResponse.json({ success: true });
}
