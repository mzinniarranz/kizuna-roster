"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kizuna-font-size";

type FontSize = "normal" | "large";

export function FontSizeSwitcher() {
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    if (stored === "large") apply("large");
  }, []);

  const apply = (size: FontSize) => {
    document.documentElement.classList.toggle("font-large", size === "large");
    localStorage.setItem(STORAGE_KEY, size);
    setFontSize(size);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={() => apply("normal")}
        title="Normal text size"
        className={`px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
          fontSize === "normal"
            ? "bg-white/20 text-white"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        A
      </button>
      <button
        onClick={() => apply("large")}
        title="Large text size"
        className={`px-2 py-1 font-semibold rounded transition-colors cursor-pointer ${
          fontSize === "large"
            ? "bg-white/20 text-white text-sm"
            : "text-white/40 hover:text-white/70 text-sm"
        }`}
      >
        A
      </button>
    </div>
  );
}
