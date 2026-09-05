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
import {
  getFailureCopy,
  resolveDocumentLocale,
} from "@/features/error-widget/failure-copy";
import { routing } from "@/i18n/routing";
import { themeFromCookie, type ThemeName } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";
import { rootStyles } from "@/theme/root-style";

import "./globals.css";

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
    readDocumentTheme,
    getDefaultTheme,
  );

  const locale = useSyncExternalStore(
    ignoreStoreUpdates,
    readDocumentLocale,
    getDefaultLocale,
  );

  const copy = getFailureCopy(locale);

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

function getDefaultLocale() {
  return routing.defaultLocale;
}

function getDefaultTheme(): ThemeName {
  return "system";
}

function ignoreStoreUpdates() {
  return () => {};
}

function readDocumentLocale() {
  return resolveDocumentLocale(document.cookie, navigator.languages);
}

function readDocumentTheme() {
  return themeFromCookie(document.cookie);
}
