"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  isOfficer: boolean;
}

export function NavLinks({ isOfficer }: NavLinksProps) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return `px-2 py-1 text-xs font-semibold rounded transition-colors ${
      isActive
        ? "bg-white/20 text-white"
        : "text-white/40 hover:text-white/70"
    }`;
  };

  const rosterHref = `/${locale}`;
  const botHref = `/${locale}/bot-management`;

  return (
    <nav className="fixed top-3 left-4 z-50 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#090d1a]/90 backdrop-blur-md border border-[#1a2438]">
      <Link href={rosterHref} className={linkClass(rosterHref)}>
        {t("roster")}
      </Link>
      {isOfficer && (
        <>
          <div className="w-px h-4 bg-white/20" />
          <Link href={botHref} className={linkClass(botHref)}>
            {t("botManagement")}
          </Link>
        </>
      )}
    </nav>
  );
}
