"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function HomePage() {
  const [, startTransition] = useTransition();
  const router = useRouter();

  return (
    <main>
      <h1>Empty bootstrap. Replace this page.</h1>

      <p>This starter is unstyled on purpose. Build from here.</p>

      <h2>Error page example</h2>
      <button
        onClick={() =>
          /**
           * Error boundaries miss throws in onClick.
           * startTransition runs this during a React update
           * so error.tsx can catch it.
           */
          startTransition(() => {
            throw new Error("Triggered from the home page");
          })
        }
        type="button"
      >
        Trigger error
      </button>

      <h2>Not found page example</h2>
      <button
        onClick={() => router.push("/this-page-does-not-exist")}
        type="button"
      >
        Trigger not found
      </button>
    </main>
  );
}
