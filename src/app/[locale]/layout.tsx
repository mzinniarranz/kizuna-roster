import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { LocaleSwitcher } from "@presentation/components/LocaleSwitcher";
import { FontSizeSwitcher } from "@presentation/components/FontSizeSwitcher";
import { AuthButton } from "@presentation/components/AuthButton";
import { SessionProviderWrapper } from "@presentation/components/SessionProviderWrapper";
import { QueryProvider } from "@presentation/components/QueryProvider";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProviderWrapper>
        <QueryProvider>
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <AuthButton />
          <div className="w-px h-4 bg-white/20" />
          <FontSizeSwitcher />
          <div className="w-px h-4 bg-white/20" />
          <LocaleSwitcher />
        </div>
        {children}
        </QueryProvider>
      </SessionProviderWrapper>
    </NextIntlClientProvider>
  );
}
