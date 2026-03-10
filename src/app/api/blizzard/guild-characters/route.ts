import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getGuildCharactersForUser } from "@infrastructure/blizzard/blizzardProfileService";

export async function GET() {
  const session = await auth();
  const sessionWithToken = session as typeof session & { accessToken?: string };

  if (!sessionWithToken?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const characters = await getGuildCharactersForUser(
      sessionWithToken.accessToken
    );
    return NextResponse.json(characters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch guild characters", detail: message },
      { status: 500 }
    );
  }
}
