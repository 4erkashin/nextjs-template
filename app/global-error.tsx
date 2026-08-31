"use client";

import "./globals.css";

/**
 * Fallback when the root layout throws. Replaces layout.tsx, so this file
 * must render `<html>` and `<body>` itself. `error.tsx` cannot catch layout
 * errors. `retry()` remounts the tree.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <button onClick={() => retry()} type="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
