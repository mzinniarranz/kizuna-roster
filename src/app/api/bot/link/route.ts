import { NextRequest, NextResponse } from "next/server";

import { linkDiscordAccount } from "@application/discord/linkDiscordAccount";
import { isBotAuthorized } from "../auth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isBotAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    battleTag: string;
    discordId: string;
    discordUser: string;
  };

  if (!body.battleTag || !body.discordId || !body.discordUser) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await linkDiscordAccount(body);
  return NextResponse.json(result);
}
