import { useQuery } from "@tanstack/react-query";

import type { BlizzardCharacter } from "@infrastructure/blizzard/blizzardProfileService";

export type GuildCharacter = BlizzardCharacter;

async function fetchGuildCharacters(): Promise<BlizzardCharacter[]> {
  const res = await fetch("/api/blizzard/guild-characters");

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const base = data.error ?? "Failed to fetch guild characters";
    const detail = data.detail ? ` — ${data.detail}` : "";
    throw new Error(`[${res.status}] ${base}${detail}`);
  }

  return res.json();
}

export function useGuildCharacters() {
  return useQuery({
    queryKey: ["guild-characters"],
    queryFn: fetchGuildCharacters,
  });
}
