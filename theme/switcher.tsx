"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { setTheme } from "./actions";
import { THEME_NAMES, type ThemeName } from "./cookie";

export function ThemeSwitcher({ theme }: Readonly<{ theme: ThemeName }>) {
  const t = useTranslations("Theme");
  const [, startTransition] = useTransition();

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
