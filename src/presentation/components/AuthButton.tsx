"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export function AuthButton() {
  const { data: session, status } = useSession();
  const t = useTranslations("Auth");

  if (status === "loading") {
    return <span className="text-xs text-white/30">...</span>;
  }

  if (session?.user) {
    const battleTag =
      (session as { battleTag?: string }).battleTag ?? session.user.name;

    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/60">{battleTag}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer text-white/40 hover:text-white/70"
        >
          {t("signOut")}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("battlenet")}
      className="px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer bg-blue-600 hover:bg-blue-500 text-white"
    >
      {t("signIn")}
    </button>
  );
}
