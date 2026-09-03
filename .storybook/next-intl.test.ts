import { readdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

import { routing } from "../i18n/routing";
import nextIntl from "./next-intl";

/**
 * This file's folder (not `pwd` / process.cwd()). Then up one into messages/:
 *   import.meta.dirname          →  /…/.storybook
 *   path.join(…, "../messages")  →  /…/messages
 */
const messagesDir = path.join(import.meta.dirname, "../messages");

/**
 * Sync (blocking) listing of names in a folder — not the files themselves:
 *   readdirSync("/…/messages")  →  ["en.json", "pt-BR.json", "ru.json", "uk.json"]
 *   .filter(.json)              →  same, drop anything that isn't a messages file
 *   .map(strip .json)           →  ["en", "pt-BR", "ru", "uk"]  (locale codes)
 */
const localesOnDisk = readdirSync(messagesDir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => name.replace(/\.json$/, ""));

/**
 * Three copies of the locale list must be the same set
 * (not a subset — `includes` would miss leftovers).
 * Sort so order doesn't matter:
 *   routing.locales              →  ["en", "ru", "uk", "pt-BR"]
 *   messagesByLocale keys        →  ["en", "pt-BR", "ru", "uk"]
 *   messages/*.json on disk      →  ["en", "pt-BR", "ru", "uk"]
 * Add `fr` in only one place, or leave `fr.json` after deleting it from routing
 * → arrays differ → fail.
 */
test("Storybook locales and messages/*.json match i18n/routing.ts", () => {
  const expected = [...routing.locales].toSorted();

  expect(Object.keys(nextIntl.messagesByLocale).toSorted()).toEqual(expected);
  expect(localesOnDisk.toSorted()).toEqual(expected);
});
