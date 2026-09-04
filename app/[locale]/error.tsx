"use client";

import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";

import { failureLockupStyles } from "@/ui/failure-lockup";

import { spacing } from "../../tokens/generated/tokens.stylex";

/**
 * Fallback UI when something in this route (or a nested one) throws at runtime.
 * Next.js wraps the segment in a React Error Boundary; this file is what users
 * see instead of a crash. `retry()` re-renders the segment.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error
 */

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <main {...stylex.props(failureLockupStyles.root, styles.page)}>
      <h1 {...stylex.props(failureLockupStyles.title)}>{t("title")}</h1>
      <p {...stylex.props(failureLockupStyles.description)}>
        {t("description")}
      </p>
      <button
        onClick={() => retry()}
        type="button"
        {...stylex.props(failureLockupStyles.action)}
      >
        {t("tryAgain")}
      </button>
      {error.digest ? (
        <p {...stylex.props(failureLockupStyles.digest)}>
          {t("ref", { digest: error.digest })}
        </p>
      ) : null}
    </main>
  );
}

const styles = stylex.create({
  page: {
    paddingBlock: spacing.m,
    paddingInline: spacing.m,
  },
});
