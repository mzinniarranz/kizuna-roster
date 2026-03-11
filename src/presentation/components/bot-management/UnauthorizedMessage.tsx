"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function UnauthorizedMessage() {
  const t = useTranslations("BotManagement");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06090f]">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-4xl">🔒</span>
        <h1 className="text-white text-xl font-semibold">{t("unauthorized")}</h1>
        <p className="text-white/40 text-sm max-w-xs">{t("unauthorizedDetail")}</p>
        <Link
          href="/"
          className="mt-2 rounded-md border border-[#1a2438] hover:border-[#2a3a58] px-4 py-2 text-sm text-white/60 hover:text-white/90 transition-colors"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
