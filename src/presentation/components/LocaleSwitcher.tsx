"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  es: "ES",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-1">
      {Object.entries(LOCALE_LABELS).map(([code, label]) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          className={`px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
            locale === code
              ? "bg-white/20 text-white"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
