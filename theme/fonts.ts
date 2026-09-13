import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import type { FontMonoVar } from "@/tokens/font-mono-var";

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["cyrillic", "latin", "latin-ext"],
  variable: "--font-mono" satisfies FontMonoVar,
  weight: "variable",
});

/**
 * Full ExtraBold face, not the Google subset. The subset drops
 * GSUB, so the `zero` (slashed 0) feature never paints.
 */
export const jetbrainsMonoNumeral = localFont({
  src: "./fonts/JetBrainsMono-ExtraBold.woff2",
  display: "swap",
  weight: "800",
});
