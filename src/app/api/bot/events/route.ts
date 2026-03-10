import { NextRequest, NextResponse } from "next/server";

import { getUpcomingEvents } from "@application/discord/getUpcomingEvents";
import { isBotAuthorized } from "../auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getUpcomingEvents();
  return NextResponse.json(events);
}
