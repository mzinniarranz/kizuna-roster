import { auth } from "@/auth";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";

import { AuthButton } from "./AuthButton";
import { FontSizeSwitcher } from "./FontSizeSwitcher";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLinks } from "./NavLinks";

export async function TopBar() {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  const officer = sessionWithId?.userId
    ? await isGuildOfficer(sessionWithId.userId).catch(() => false)
    : false;

  return (
    <div className="flex items-center justify-between h-12 px-6 shrink-0 border-b border-[#1a2438] bg-[#090d1a]">
      <NavLinks isOfficer={officer} />
      <div className="flex items-center gap-3">
        <AuthButton />
        <div className="w-px h-4 bg-white/20" />
        <FontSizeSwitcher />
        <div className="w-px h-4 bg-white/20" />
        <LocaleSwitcher />
      </div>
    </div>
  );
}
