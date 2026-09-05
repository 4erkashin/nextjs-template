/**
 * Props Next.js passes to `error.tsx` and `global-error.tsx`.
 * Next does not export this type; this is the shape in their docs.
 *
 * `digest` is an id Next stamps on a server throw. The browser never
 * gets the real stack; this string is how you match the screen to the
 * server log. Client-side throws often have none.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

/**
 * User-land digest Next would attach: `string-hash` of message + stack,
 * shown as an unsigned 32-bit decimal. Framework errors may append `@E…`.
 * Stories use this so the footer matches that shape, not a made-up hex id.
 */
export const EXAMPLE_ERROR_DIGEST = "2691371501";

