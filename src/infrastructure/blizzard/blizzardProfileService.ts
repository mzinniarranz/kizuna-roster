export interface BlizzardCharacter {
  id: number;
  name: string;
  realmSlug: string;
  realmName: string;
  classId: number;
  level: number;
}

const GUILD_REALM = "sanguino";
const REGION = "eu";
const NAMESPACE = `profile-${REGION}`;
const LOCALE = "en_US";

async function parseJsonOrThrow(res: Response, context: string): Promise<unknown> {
  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable body)");
    throw new Error(`${context} — HTTP ${res.status} ${res.statusText}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function getClientCredentialsToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.BLIZZARD_CLIENT_ID}:${process.env.BLIZZARD_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = await parseJsonOrThrow(res, "Client credentials token") as { access_token: string };
  return data.access_token;
}

interface GuildMember {
  character: { name: string; realm: { slug: string } };
  rank: number;
}

async function fetchGuildRoster(token: string): Promise<GuildMember[]> {
  const url = `https://${REGION}.api.blizzard.com/data/wow/guild/${GUILD_REALM}/kizuna/roster?namespace=profile-${REGION}&locale=${LOCALE}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await parseJsonOrThrow(res, `Guild roster (${url})`) as {
    members?: GuildMember[];
  };

  return data.members ?? [];
}

async function getGuildRosterMembers(token: string): Promise<Set<string>> {
  const members = await fetchGuildRoster(token);
  return new Set(
    members.map(
      (m) =>
        `${m.character.name.toLowerCase()}|${m.character.realm.slug.toLowerCase()}`
    )
  );
}

export async function getGuildRosterWithRanks(): Promise<Map<string, number>> {
  const token = await getClientCredentialsToken();
  const members = await fetchGuildRoster(token);
  return new Map(
    members.map((m) => [
      `${m.character.name.toLowerCase()}|${m.character.realm.slug.toLowerCase()}`,
      m.rank,
    ])
  );
}

interface RawCharacter {
  id: number;
  name: string;
  level: number;
  realm?: { slug: string; name: string };
  playable_class?: { id: number };
}

export async function getGuildCharactersForUser(
  accessToken: string
): Promise<BlizzardCharacter[]> {
  const profileUrl = `https://${REGION}.api.blizzard.com/profile/user/wow?namespace=${NAMESPACE}&locale=${LOCALE}`;

  const [profileRes, clientToken] = await Promise.all([
    fetch(profileUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }),
    getClientCredentialsToken(),
  ]);

  const [guildMembers, data] = await Promise.all([
    getGuildRosterMembers(clientToken),
    parseJsonOrThrow(profileRes, `User profile (${profileUrl})`),
  ]);

  const profileData = data as { wow_accounts?: { characters?: RawCharacter[] }[] };
  const characters: RawCharacter[] = (profileData.wow_accounts ?? []).flatMap(
    (a) => a.characters ?? []
  );

  return characters
    .filter((c) =>
      guildMembers.has(
        `${c.name.toLowerCase()}|${c.realm?.slug?.toLowerCase() ?? ""}`
      )
    )
    .map((c) => ({
      id: c.id,
      name: c.name,
      realmSlug: c.realm?.slug ?? GUILD_REALM,
      realmName: c.realm?.name ?? "",
      classId: c.playable_class?.id ?? 0,
      level: c.level ?? 0,
    }));
}
