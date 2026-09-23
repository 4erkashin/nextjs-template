import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Image from "next/image";

import { routing } from "@/i18n/routing";
import { captionForLocale } from "@/lib/storybook/locale-captions";

const baseUrl = (
  process.env.STORYBOOK_OG_BASE_URL || "http://localhost:3000"
).replace(/\/$/, "");

const meta = {
  title: "App/OG images",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLocales: Story = {
  name: "All locales",
  render: () => (
    <main
      style={{
        boxSizing: "border-box",
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        height: "100dvh",
        padding: 12,
        width: "100%",
      }}
    >
      {routing.locales.map((locale) => (
        <figure
          key={locale}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <figcaption
            style={{
              color: "#64748b",
              fontFamily: "sans-serif",
              fontSize: 12,
              marginBottom: 6,
            }}
          >
            {captionForLocale(locale)}
          </figcaption>
          <Image
            alt={`${captionForLocale(locale)} Open Graph image`}
            height={630}
            src={`${baseUrl}/${locale}/opengraph-image`}
            style={{
              background: "#07161d",
              border: "1px solid #334155",
              display: "block",
              flex: "1 1 auto",
              height: "100%",
              minHeight: 0,
              objectFit: "contain",
              width: "100%",
            }}
            unoptimized
            width={1200}
          />
        </figure>
      ))}
    </main>
  ),
};
