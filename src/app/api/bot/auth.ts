import { NextRequest } from "next/server";

export function isBotAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.BOT_SECRET}`;
  return !!process.env.BOT_SECRET && authHeader === expected;
}
