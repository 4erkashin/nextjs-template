"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels = {
  en: "EN",
  "pt-BR": "PT-BR",
  ru: "RU",
  uk: "UA",
} as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav>
      {routing.locales.map((item, index) => (
        <span key={item}>
          {index > 0 ? " " : null}
          <Link
            aria-current={item === locale ? "true" : undefined}
            href={pathname}
            hrefLang={item}
            locale={item}
          >
            {labels[item]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
