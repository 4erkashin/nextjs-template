import type { Metadata } from "next";
import type { ReactNode } from "react";

import * as stylex from "@stylexjs/stylex";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locale } from "next/root-params";

import { routing } from "@/i18n/routing";
import { getTheme } from "@/theme/get-theme";
import { themeRootProps } from "@/theme/root-props";
import { rootStyles } from "@/theme/root-style";
import { ThemeSwitcher } from "@/theme/switcher";

import { Providers } from "../providers";
import { LocaleSwitcher } from "./locale-switcher";

import "../globals.css";

export const metadata: Metadata = {
  title: "App",
};

export function generateStaticParams() {
  return routing.locales.map((item) => ({ locale: item }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const currentLocale = await locale();

  if (!hasLocale(routing.locales, currentLocale)) {
    notFound();
  }

  const theme = await getTheme();

  return (
    <html {...themeRootProps(theme)} lang={currentLocale}>
      <body {...stylex.props(rootStyles.body)}>
        <NextIntlClientProvider>
          <Providers>
            <header {...stylex.props(rootStyles.chrome)}>
              <LocaleSwitcher />
              <ThemeSwitcher theme={theme} />
            </header>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
