import type { Metadata } from "next";

import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { type ReactNode, Suspense } from "react";

import { globalStyles, htmlPropsForTheme } from "@/app/global-styles";
import { routing } from "@/i18n/routing";
import { getTheme, jetbrainsMono, onest } from "@/theme";
import { PageGridOverlay } from "@/ui/page-grid";
import { PageGridOverlayGate } from "@/ui/page-grid/page-grid-overlay-gate";

import { Providers } from "../providers";

import "../globals.css";

export const metadata: Metadata = {
  description: "Next.js starter with StyleX, tokens, and locales.",
  /**
   * Home (the page in this folder) uses `default`: `Bootstrap`.
   * A nested page with `title: "About"` becomes `About · Bootstrap`.
   * `%s` is that child's title. The template skips this folder's own page,
   * so the tab is never `Bootstrap · Bootstrap`.
   *
   * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template
   */
  title: {
    default: "Bootstrap",
    template: "%s · Bootstrap",
  },
};

/**
 * The folder is named `[locale]`, so Next treats the language as a blank.
 * It does not read `routing` on its own to learn `en`, `ru`, and the rest.
 * This function runs at build time and returns one `{ locale }` per entry
 * in `routing.locales`. Next fills the blank with each value and builds
 * that many copies of this layout (and the pages under it) before anyone
 * visits, so the first request is not waiting on a render.
 * A language missing from that list still 404s in the check below.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export function generateStaticParams() {
  return routing.locales.map((item) => ({ locale: item }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  /**
   * `locale` is not a something we set.
   *
   * Next made this function because the folder is named `[locale]`.
   * `proxy.ts` looks at the URL (and a locale cookie) and fills that blank:
   * `/ru` becomes `"ru"`, and `/` becomes `"en"` because English has no
   * prefix (`localePrefix: "as-needed"`).
   * `await locale()` reads the filled blank for this request.
   *
   * @see https://nextjs.org/docs/app/api-reference/functions/next-root-params
   */
  const currentLocale = await locale();

  /**
   * `[locale]` already matched the URL. Next will put any string in that
   * slot (`/zz` still reaches this file). This is only "is it in our list?"
   * If not, show not-found instead of putting an unknown language on `<html>`.
   */
  if (!hasLocale(routing.locales, currentLocale)) {
    notFound();
  }

  const theme = await getTheme();
  const htmlProps = htmlPropsForTheme(theme);

  return (
    <html
      {...htmlProps}
      className={clsx(
        jetbrainsMono.variable,
        onest.variable,
        htmlProps.className,
      )}
      data-theme={theme}
      lang={currentLocale}
    >
      <body {...stylex.props(globalStyles.body)}>
        <Suspense fallback={null}>
          <PageGridOverlayGate>
            <PageGridOverlay />
          </PageGridOverlayGate>
        </Suspense>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
