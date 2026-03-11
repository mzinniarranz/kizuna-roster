import { useQuery } from "@tanstack/react-query";

import type { BlizzardCharacter } from "@infrastructure/blizzard/blizzardProfileService";

export type GuildCharacter = BlizzardCharacter;

export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
  }
}

async function fetchGuildCharacters(): Promise<BlizzardCharacter[]> {
  const res = await fetch("/api/blizzard/guild-characters");

  if (!res.ok) {
    throw new HttpError(res.status);
  }

  return res.json();
}

export function useGuildCharacters() {
  return useQuery({
    queryKey: ["guild-characters"],
    queryFn: fetchGuildCharacters,
  });
}
