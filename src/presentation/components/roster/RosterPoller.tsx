"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RosterPoller({ intervalMs = 30_000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const poll = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    const id = setInterval(poll, intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
