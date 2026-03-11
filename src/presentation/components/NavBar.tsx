import { auth } from "@/auth";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";

import { NavLinks } from "./NavLinks";

export async function NavBar() {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  if (!sessionWithId?.userId) {
    return <NavLinks isOfficer={false} />;
  }

  const officer = await isGuildOfficer(sessionWithId.userId).catch(() => false);

  return <NavLinks isOfficer={officer} />;
}
