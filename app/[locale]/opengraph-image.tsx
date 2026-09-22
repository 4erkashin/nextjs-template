import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { routing } from "@/i18n/routing";

/**
 * Satori paints hex. These are the night, frost, and coral
 * primitives from `tokens/tokens.json`.
 */
const night = "#07161d";
const frost = "#e9f0f3";
const coral = "#f36358";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * ImageResponse accepts TTF, OTF, or WOFF, and its default face
 * is Latin only. These are static Onest cuts — the same family as
 * `theme/fonts.ts` — with Latin and Cyrillic, at the home page's
 * 500 and 800 weights. License: `theme/fonts/OFL.txt`.
 */
const [onestMedium, onestExtraBold] = await Promise.all([
  readFile(join(process.cwd(), "theme/fonts/Onest-Medium.ttf")),
  readFile(join(process.cwd(), "theme/fonts/Onest-ExtraBold.ttf")),
]);

function fontBytes(file: Buffer): ArrayBuffer {
  const copy = new Uint8Array(file.byteLength);
  copy.set(file);

  return copy.buffer;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  /**
   * The home copy block uppercases both lines. Uppercase here
   * with the locale so Ukrainian `і` becomes `І`.
   */
  const title = t("title").toLocaleUpperCase(locale);

  /**
   * `<storybook>` is a link on the page. `markup` keeps the
   * words inside the tag and drops the tag itself.
   */
  const description = t
    .markup("description", {
      storybook: (chunks) => chunks,
    })
    .toLocaleUpperCase(locale);

  return new ImageResponse(
    <div
      style={{
        backgroundColor: night,
        color: frost,
        display: "flex",
        fontFamily: "Onest",
        height: "100%",
        padding: 72,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: coral,
          display: "flex",
          marginRight: 40,
          width: 10,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: 2,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 1,
            lineHeight: 1.1,
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          data: fontBytes(onestMedium),
          name: "Onest",
          style: "normal",
          weight: 500,
        },
        {
          data: fontBytes(onestExtraBold),
          name: "Onest",
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
