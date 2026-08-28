// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function HomePage() {
  return (
    <main>
      <h1>Empty bootstrap. Replace this page.</h1>
      <p>This starter is unstyled on purpose. Build from here.</p>
    </main>
  );
}
