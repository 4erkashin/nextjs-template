"use client";

import { useTranslations } from "next-intl";

import { type ErrorPageProps, ErrorWidget } from "@/features/error-widget";

/**
 * Fallback UI when something in this route (or a nested one) throws at runtime.
 * Next.js wraps the segment in a React Error Boundary; this file is what users
 * see instead of a crash. `retry()` re-renders the segment.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error
 */

export default function Error({ error, retry }: ErrorPageProps) {
  const t = useTranslations("Error");

  return (
    <ErrorWidget
      description={t("description")}
      digest={error.digest}
      onRetry={retry}
      title={t("title")}
      tryAgain={t("tryAgain")}
    />
  );
}
