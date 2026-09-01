"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { useRouter } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>{t("title")}</h1>

      <p>{t("description")}</p>

      <p>{t("itemCount", { count })}</p>
      <button onClick={() => setCount((value) => value + 1)} type="button">
        {t("addItem")}
      </button>

      <h2>{t("errorHeading")}</h2>
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
        {t("triggerError")}
      </button>

      <h2>{t("notFoundHeading")}</h2>
      <button
        onClick={() => router.push("/this-page-does-not-exist")}
        type="button"
      >
        {t("triggerNotFound")}
      </button>
    </main>
  );
}
