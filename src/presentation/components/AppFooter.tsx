import { useTranslations } from "next-intl";

export function AppFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto w-full text-center py-4">
      <p className="text-white/20 text-xs">
        {t("license")}{" "}
        <a
          href="https://github.com/mzinniarranz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/50 transition-colors underline underline-offset-2"
        >
          Marc Zinni Arranz
        </a>
      </p>
    </footer>
  );
}
