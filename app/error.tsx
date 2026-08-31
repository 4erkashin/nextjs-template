"use client";

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
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={() => retry()} type="button">
        Try again
      </button>
    </main>
  );
}
