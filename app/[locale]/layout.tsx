import type { Metadata } from "next";
import type { ReactNode } from "react";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locale } from "next/root-params";

import { routing } from "@/i18n/routing";

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

  return (
    <html lang={currentLocale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <LocaleSwitcher />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
