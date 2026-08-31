import Link from "next/link";

/**
 * UI for a missing page. Next.js renders this when no route matches, or when
 * a server component calls notFound(). It is the 404 for this segment.
 * https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */

export default function NotFound() {
  return (
    <main>
      <h1>Not found</h1>
      <p>Not found</p>
      <Link href="/">Home</Link>
    </main>
  );
}
