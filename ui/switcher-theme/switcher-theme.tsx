"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore, useTransition } from "react";

import { setTheme } from "@/theme/actions";
import { THEME_NAMES } from "@/theme/cookie";
import { readHtmlTheme, subscribeHtmlTheme } from "@/theme/html-theme";

export function SwitcherTheme() {
  const t = useTranslations("Theme");
  const [, startTransition] = useTransition();
  const theme = useSyncExternalStore(
    subscribeHtmlTheme,
    readHtmlTheme,
    () => "system",
  );

  return (
    <nav aria-label={t("label")}>
      {THEME_NAMES.map((item, index) => (
        <span key={item}>
          {index > 0 ? " " : null}
          <button
            aria-current={item === theme ? "true" : undefined}
            onClick={() => {
              startTransition(() => {
                void setTheme(item);
              });
            }}
            type="button"
          >
            {t(item)}
          </button>
        </span>
      ))}
    </nav>
  );
}
