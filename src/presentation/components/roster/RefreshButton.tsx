"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function RefreshButton() {
  const router = useRouter();
  const t = useTranslations("RosterGrid");

  return (
    <button
      onClick={() => router.refresh()}
      title={t("refresh")}
      className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    </button>
  );
}
