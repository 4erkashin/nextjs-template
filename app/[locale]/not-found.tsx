"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * UI for a missing page. Next.js renders this when no route matches, or when
 * a server component calls notFound(). It is the 404 for this segment.
 * https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/">{t("home")}</Link>
    </main>
  );
}
