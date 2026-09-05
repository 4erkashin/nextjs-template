/**
 * `"use client"` is required because Next turns this file into a React error boundary:
 * a client wrapper around the crashed tree that catches the throw,
 * keeps that fact in client state, and shows this fallback instead.
 * That wrapper cannot live in a Server Component.
 *
 * This is the last-resort fallback when the root layout itself throws.
 * It replaces `layout.tsx`, so it must render `<html>` and `<body>`.
 * A nested `error.tsx` cannot catch layout errors. `retry()` remounts
 * the tree.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */
"use client";

import * as stylex from "@stylexjs/stylex";
import { useSyncExternalStore } from "react";

import { type ErrorPageProps, ErrorWidget } from "@/features/error-widget";
import { routing } from "@/i18n/routing";
import { readCookie } from "@/lib/cookie";
import en from "@/messages/en.json";
import ptBR from "@/messages/pt-BR.json";
import ru from "@/messages/ru.json";
import uk from "@/messages/uk.json";
import { themeFromCookie } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";
import { rootStyles } from "@/theme/root-style";

import "./globals.css";

type AppLocale = (typeof routing.locales)[number];

/**
 * next-intl's default locale cookie.
 * Named here so the crashed tree does not import the middleware just to read a string.
 *
 * @see https://next-intl.dev/docs/routing/configuration#locale-cookie
 */
const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * next-intl is gone with the layout.
 * These are the Error strings from each catalog
 * so this page can still speak the user's language.
 */
const copyByLocale = {
  en: en.Error,
  "pt-BR": ptBR.Error,
  ru: ru.Error,
  uk: uk.Error,
};

/**
 * Stays a named function outside the component so its identity does not change between renders.
 * An inline subscribe would be new every time, and React would unsubscribe and subscribe again.
 *
 * @see https://react.dev/reference/react/useSyncExternalStore#my-subscribe-function-gets-called-after-every-re-render
 */
function ignoreStoreUpdates() {
  return () => {};
}

/**
 * A cookie or navigator.languages entry is a plain string.
 * TypeScript will not treat that string as exact locale key until something proves it.
 */
function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

/**
 * Turn a browser language tag into one of this app's locales.
 * Tries an exact match (`pt-BR`), then the language only (`en-US` → `en`),
 * then the same language with a different region (`pt-PT` → `pt-BR`).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages
 */
function matchAppLocale(languageTag: string): AppLocale | undefined {
  if (isAppLocale(languageTag)) {
    return languageTag;
  }

  const language = languageTag.split("-")[0];

  if (language && isAppLocale(language)) {
    return language;
  }

  if (!language) {
    return undefined;
  }

  return routing.locales.find((locale) => locale.startsWith(`${language}-`));
}

function readDocumentLocale() {
  const cookieLocale = readCookie(document.cookie, LOCALE_COOKIE);

  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale;
  }

  for (const languageTag of navigator.languages) {
    const matched = matchAppLocale(languageTag);

    if (matched) {
      return matched;
    }
  }

  return routing.defaultLocale;
}

export default function GlobalError({ error, retry }: ErrorPageProps) {
  /**
   * This page replaces the root layout, so the theme and locale providers are gone.
   * We read the cookie and the browser language list ourselves.
   *
   * Those live on `document` and `navigator`, which the server does not have.
   * `useSyncExternalStore` is how React wants you to read something outside React:
   * the last argument is what to render on the server (and on the first client paint, so it matches),
   * and the middle argument is the real browser read after that.
   * Reading `document` in render would crash on the server or paint a mismatch;
   * `useState` plus `useEffect` would flash the default first.
   *
   * Subscribe does nothing. Cookies have no change event we listen to,
   * and this screen does not need to update if they change.
   * We only need that server-then-browser split.
   */
  const theme = useSyncExternalStore(
    ignoreStoreUpdates,
    () => themeFromCookie(document.cookie),
    () => "system" as const,
  );

  const locale = useSyncExternalStore(
    ignoreStoreUpdates,
    readDocumentLocale,
    () => routing.defaultLocale,
  );

  const copy = copyByLocale[locale];

  return (
    <html {...themeRootProps(theme)} lang={locale}>
      <body {...stylex.props(rootStyles.body)}>
        <title>{copy.title}</title>

        <ErrorWidget
          description={copy.description}
          digest={error.digest}
          onRetry={retry}
          title={copy.title}
          tryAgain={copy.tryAgain}
        />
      </body>
    </html>
  );
}
