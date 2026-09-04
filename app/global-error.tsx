/**
 * `"use client"` is required because Next turns this file into a React
 * error boundary:
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

import {
  formatFailureRef,
  getFailureCopy,
  resolveDocumentLocale,
} from "@/i18n/failure-copy";
import { routing } from "@/i18n/routing";
import { themeFromCookie, type ThemeName } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";
import { rootStyles } from "@/theme/root-style";
import { failureLockupStyles } from "@/ui/failure-lockup";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
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

  const caption = error.digest
    ? formatFailureRef(copy.ref, error.digest)
    : undefined;

  return (
    <html {...themeRootProps(theme)} lang={locale}>
      <body {...stylex.props(rootStyles.body)}>
        <title>{copy.title}</title>

        <main>
          <div {...stylex.props(failureLockupStyles.root)}>
            <h1 {...stylex.props(failureLockupStyles.title)}>{copy.title}</h1>
            <p {...stylex.props(failureLockupStyles.description)}>
              {copy.description}
            </p>
            <button
              onClick={() => retry()}
              type="button"
              {...stylex.props(failureLockupStyles.action)}
            >
              {copy.tryAgain}
            </button>
          </div>
          {caption ? (
            <p {...stylex.props(failureLockupStyles.digest)}>{caption}</p>
          ) : null}
        </main>
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
