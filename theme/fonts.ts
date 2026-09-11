import { JetBrains_Mono } from "next/font/google";

import type { FontMonoVar } from "@/tokens/font-mono-var";

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["cyrillic", "latin", "latin-ext"],
  variable: "--font-mono" satisfies FontMonoVar,
  weight: "variable",
});
